export const wordDelay = (modifier, wpm) => ((1000 * 60 / wpm) * modifier)

export const wordDelayModifier = (word) => {
  let modifier = 0
  switch (word.length) {
    case 6:
    case 7:
      modifier = modifier + 0.4
      break
    case 8:
    case 9:
      modifier = modifier + 0.6
      break
    case 10:
    case 11:
      modifier = modifier + 0.8
      break
    case 12:
    case 13:
      modifier = modifier + 1
  }
  return modifier
}

export const wordOffset = (word) => {
  const len = word.length
  if (len < 3) return 4
  else if (len < 6) return 3
  else if (len < 10) return 2
  else if (len < 14) return 1
  else return 1
}

export const wordShouldBeSplit = word => {
  const isLongWord = word.length > 13
  const isMediumWord = word.length > 9
  const containsDash = word.indexOf('-') > -1
  return isLongWord || isMediumWord && containsDash
}

// split a long word into sensible sections
export const splitWord = word => {
  let result
  if (wordShouldBeSplit(word)) {
    const dashIndex = word.indexOf('-')
    if (dashIndex > 0 && dashIndex < word.length - 1) {
      return [
        word.substr(0, dashIndex),
        word.substr(dashIndex + 1)
      ]
    } else {
      let segments = []
      let partitions = Math.ceil(word.length / 8)
      const partitionLength = Math.ceil(word.length / partitions)

      while (partitions--) {
        segments = [
          ...segments,
          word.substr(0, partitionLength)
        ]
        word = word.substr(partitionLength)
      }
      result = segments
    }
  } else {
    result = [word]
  }

  return result.map((word, i) => {
    // add a dash to the end of every segment except the last
    if (i < result.length - 1) {
      return [word, '-'].join('')
    }
    return word
  })
}
