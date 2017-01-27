export const wordDelayModifier = (word) => {
  let modifier = 0
  switch (word.length) {
    case 6:
    case 7:
      modifier = 0.4
      break
    case 8:
    case 9:
      modifier = 0.6
      break
    case 10:
    case 11:
      modifier = 0.8
      break
    case 12:
    case 13:
      modifier = 1
  }
  return modifier
}

export function wordShouldBeSplit (word) {
  const isLongWord = word.length > 13
  const isMediumWord = word.length > 9
  const containsDash = word.indexOf('-') > -1
  return isLongWord || isMediumWord && containsDash
}

// split a long word into sensible sections
export function splitWord (word) {
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

  return result.map((word, index) => {
    // add a dash to the end of every segment except the last
    if (index < result.length - 1) {
      return [word, '-'].join('')
    }
    return word
  })
}
