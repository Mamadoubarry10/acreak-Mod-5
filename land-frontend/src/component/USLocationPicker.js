import React from 'react'
import { getStates, groupCitiesByState } from '@mardillu/us-cities-utils'

const STATE_CODES = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC'
])

export const US_STATES = getStates()
  .filter(state => STATE_CODES.has(state.nameAbbr))
  .map(state => ({ name: state.name, isoCode: state.nameAbbr }))
  .sort((a, b) => a.name.localeCompare(b.name))

const STATE_NAMES = US_STATES.reduce((names, state) => {
  names[state.isoCode] = state.name
  return names
}, {})

const normalize = value => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()

const uniqueCities = new Map()

Object.entries(groupCitiesByState())
  .filter(([stateCode]) => STATE_CODES.has(stateCode))
  .forEach(([stateCode, cities]) => {
    cities.forEach(city => {
      const key = `${normalize(city.name)}|${stateCode}`
      if (!uniqueCities.has(key)) {
        uniqueCities.set(key, {
          name: city.name,
          stateCode,
          normalizedName: normalize(city.name),
          stateName: STATE_NAMES[stateCode]
        })
      }
    })
  })

const US_CITIES = Array.from(uniqueCities.values())

const editDistance = (left, right) => {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index)

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex]

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + (
          left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1
        )
      )
    }

    previous.splice(0, previous.length, ...current)
  }

  return previous[right.length]
}

const matchScore = (cityName, query) => {
  if (cityName === query) return 0
  if (cityName.startsWith(query)) return 1
  if (cityName.split(/[\s-]+/).some(word => word.startsWith(query))) return 2
  if (cityName.includes(query)) return 3

  if (
    query.length >= 4 &&
    Math.abs(cityName.length - query.length) <= 2
  ) {
    const distance = editDistance(cityName, query)
    if (distance <= 2) return 4 + distance
  }

  return Number.POSITIVE_INFINITY
}

export const findExactUSCity = (cityName, stateCode) => {
  if (!cityName || !stateCode) return null
  const normalizedCity = normalize(cityName)

  return US_CITIES.find(
    city => city.stateCode === stateCode && city.normalizedName === normalizedCity
  ) || null
}

export const findCityMatches = (query, stateCode) => {
  const normalizedQuery = normalize(query)
  if (normalizedQuery.length < 2) return []

  return US_CITIES
    .filter(city => !stateCode || city.stateCode === stateCode)
    .map(city => ({ city, score: matchScore(city.normalizedName, normalizedQuery) }))
    .filter(result => Number.isFinite(result.score))
    .sort((left, right) => (
      left.score - right.score ||
      left.city.name.localeCompare(right.city.name) ||
      left.city.stateCode.localeCompare(right.city.stateCode)
    ))
    .slice(0, 8)
    .map(result => result.city)
}

class USLocationPicker extends React.Component {
  state = {
    isOpen: false,
    activeIndex: -1
  }

  getMatches = () => findCityMatches(this.props.city, this.props.stateCode)

  handleCityChange = event => {
    const city = event.target.value
    const matchingScope = US_CITIES.filter(
      location => !this.props.stateCode || location.stateCode === this.props.stateCode
    )
    const exactMatches = matchingScope.filter(
      location => location.normalizedName === normalize(city)
    )

    if (exactMatches.length === 1) {
      this.props.onChange({
        city: exactMatches[0].name,
        stateCode: exactMatches[0].stateCode,
        isValid: true
      })
      this.setState({ isOpen: false, activeIndex: -1 })
      return
    }

    this.props.onChange({
      city,
      stateCode: this.props.stateCode,
      isValid: false
    })
    this.setState({
      isOpen: normalize(city).length >= 2,
      activeIndex: -1
    })
  }

  handleStateChange = event => {
    const stateCode = event.target.value
    const exactCity = findExactUSCity(this.props.city, stateCode)

    this.props.onChange({
      city: exactCity ? exactCity.name : '',
      stateCode,
      isValid: Boolean(exactCity)
    })
    this.setState({ isOpen: false, activeIndex: -1 })
  }

  selectCity = city => {
    this.props.onChange({
      city: city.name,
      stateCode: city.stateCode,
      isValid: true
    })
    this.setState({ isOpen: false, activeIndex: -1 })
  }

  handleKeyDown = event => {
    const matches = this.getMatches()
    if (!matches.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      this.setState(previous => ({
        isOpen: true,
        activeIndex: Math.min(previous.activeIndex + 1, matches.length - 1)
      }))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      this.setState(previous => ({
        isOpen: true,
        activeIndex: Math.max(previous.activeIndex - 1, 0)
      }))
    } else if (event.key === 'Enter' && this.state.activeIndex >= 0) {
      event.preventDefault()
      this.selectCity(matches[this.state.activeIndex])
    } else if (event.key === 'Escape') {
      this.setState({ isOpen: false, activeIndex: -1 })
    }
  }

  render() {
    const matches = this.getMatches()
    const showMatches = this.state.isOpen && matches.length > 0

    return (
      <div className="location-picker field-group-wide">
        <div className="field-group location-city-field">
          <label htmlFor="signup-city">City</label>
          <div className="location-combobox">
            <input
              id="signup-city"
              className="theme-input"
              type="text"
              value={this.props.city}
              onChange={this.handleCityChange}
              onFocus={() => this.setState({
                isOpen: normalize(this.props.city).length >= 2
              })}
              onBlur={() => this.setState({ isOpen: false, activeIndex: -1 })}
              onKeyDown={this.handleKeyDown}
              placeholder="Start typing a U.S. city"
              autoComplete="off"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showMatches}
              aria-controls="city-suggestions"
              aria-activedescendant={
                this.state.activeIndex >= 0
                  ? `city-option-${this.state.activeIndex}`
                  : undefined
              }
              required
            />
            {showMatches && (
              <ul id="city-suggestions" className="location-suggestions" role="listbox">
                {matches.map((city, index) => (
                  <li
                    id={`city-option-${index}`}
                    key={`${city.name}-${city.stateCode}`}
                    className={
                      index === this.state.activeIndex
                        ? 'location-suggestion active'
                        : 'location-suggestion'
                    }
                    role="option"
                    aria-selected={index === this.state.activeIndex}
                    onMouseDown={event => {
                      event.preventDefault()
                      this.selectCity(city)
                    }}
                  >
                    <span>{city.name}</span>
                    <small>{city.stateName} · {city.stateCode}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <small className="field-hint">
            Pick a suggestion to match the city with its correct state.
          </small>
        </div>

        <div className="field-group">
          <label htmlFor="signup-state">State</label>
          <select
            id="signup-state"
            className="theme-input theme-select"
            value={this.props.stateCode}
            onChange={this.handleStateChange}
            required
          >
            <option value="">Select a state</option>
            {US_STATES.map(state => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
          <small className="field-hint">
            Selecting a state narrows the city matches.
          </small>
        </div>
      </div>
    )
  }
}

export default USLocationPicker
