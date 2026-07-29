import {
  findCityMatches,
  findExactUSCity,
  US_STATES
} from './USLocationPicker'

describe('USLocationPicker location matching', () => {
  test('includes the 50 states and Washington, D.C.', () => {
    expect(US_STATES).toHaveLength(51)
    expect(US_STATES).toEqual(expect.arrayContaining([
      expect.objectContaining({ isoCode: 'CA', name: 'California' }),
      expect.objectContaining({ isoCode: 'DC' })
    ]))
  })

  test('matches an exact city and state without case sensitivity', () => {
    expect(findExactUSCity('san francisco', 'CA')).toEqual(
      expect.objectContaining({ name: 'San Francisco', stateCode: 'CA' })
    )
  })

  test('offers the correct city for a minor spelling mistake', () => {
    expect(findCityMatches('San Fransisco', '')[0]).toEqual(
      expect.objectContaining({ name: 'San Francisco', stateCode: 'CA' })
    )
  })

  test('limits city matches to the selected state', () => {
    const matches = findCityMatches('New Yo', 'NY')

    expect(matches.length).toBeGreaterThan(0)
    expect(matches.every(city => city.stateCode === 'NY')).toBe(true)
  })
})
