export const MODIFIERS = {
  NORMAL: 1,
  START_CLAUSE: 1,
  END_CLAUSE: 1.8,
  START_SENTENCE: 1.3,
  END_SENTENCE: 2.2,
  START_PARAGRAPH: 2.0,
  END_PARAGRAPH: 2.8,
  SHORT_SPACE: 1.5,
  LONG_SPACE: 2.2
}

export const WRAPS = {
  GUILLEMOT: {
    LEFT: '«',
    RIGHT: '»'
  },
  STANDARD_QUOTE: {
    LEFT: '"',
    RIGHT: '"'
  },
  DOUBLE_QUOTE: {
    LEFT: '“',
    RIGHT: '”'
  },
  PARENS: {
    LEFT: '(',
    RIGHT: ')'
  },
  BRACKETS: {
    LEFT: '[',
    RIGHT: ']'
  }
}

export const MATCH = {
  DASHES: /^(\/|-|\.|--|—|–)$/gm,
  SENTENCE_END: /([.?!…]+[\n\s"])/g,
  CLAUSE_END: /[,:]$/g,
  NEWLINE: /\n+/g,
  LINEFEED: /[.?!…'"”]+$/g,
  // TODO: handle nested double quotes in TOKENS
  TOKENS: /["«»“”()/–—]|--+|\n+|[^\s"“«»”()/–—]+/g
}
