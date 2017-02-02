<template>
  <section>
    <textarea v-if='!active' tabindex="0" v-model='text'></textarea>
    <display-area></display-area>
    <player></player>
    <slider v-on:update='update'></slider>
    <control></control>
  </section>
</template>

<script>
import DisplayArea from './reader/DisplayArea'
import Control from './reader/Control'
import Player from './reader/Player'
import Slider from './reader/Slider'

export default {
  name: 'speed-reader',
  components: {
    DisplayArea,
    Control,
    Player,
    Slider
  },
  created () { window.addEventListener('keydown', this.control) },
  beforeDestroy () { window.removeEventListener('keydown', this.control) },
  data () {
    return {
      text: `Speed reading has long been a skill peddled by supposed experts, and recently a slew of cheap apps claiming to teach the technique have put it back in the spotlight. So, let's take a look at the claims of speed reading and if it's really possible to read 1,200 words a minute.\n\nMost of us tend to read at about 200-400 words per minute. Speed readers claim to hit around 1000-1700 words per minute. To get a better idea of whether these claims have research to back them up, I spoke with professor and eye tracking researcher Keith Rayner from the University of California, San Diego.\n\nLet's start by taking a look at different methods of speed reading before we dig into what does and doesn't work about it.\n\nDifferent Methods of Speed Reading\n\nBefore we can talk about speed reading, we need to lay down the specifics of how we tend to read and comprehend text normally. Slate breaks down what we know about reading:\n\nWhen you factor out the amount of time spent thinking through complex and unfamiliar concepts—a rarity when people read for pleasure—reading is an appallingly mechanical process. You look at a word or several words. This is called a "fixation," and it takes about .25 seconds on average. You move your eye to the next word or group of words. This is called a "saccade," and it takes up to about .1 seconds on average. After this is repeated once or twice, you pause to comprehend the phrase you just looked at. That takes roughly 0.3 to 0.5 seconds on average. Add all these fixations and saccades and comprehension pauses together and you end up with about 95 percent of all college-level readers reading between 200 and 400 words per minute.\n\nSpeed readers supposedly shorten how long they fixate on a word. They tend to do this by cutting down on subvocalization. The end goal being faster than the 0.3-0.5 seconds listed above. The idea of speed reading has been around since the 1950s, but it's seeing a revival recently with many apps popping up in the last few weeks.\n\nAs you'd expect, speed reading has a few different popular methods, but most fall into a couple different systems. These methods include skimming, meta guiding, Rapid Serial Visual Presentation, and others.\n\nSkimming is to glance through text to find important parts to read. Although this is usually considered a speed reading method, you're not teaching yourself to read faster. You're just learning which parts you can skip over. As you'd expect, studies show that we don't remember that many details when we skim.\n\nMeta guiding is one of the older techniques. It's when you use a finger (or a pointer like a pen) to guide your eyes to specific words. The point is to decrease distraction and focus on the specific words to increase your reading speed.\n\nAnother method pushes you "read" multiple lines at once by expanding your peripheral vision. Tim Ferriss has a speed reading technique that riffs on this idea and trains your focus more than anything else.\n\nRapid Serial Visual Presentation (RSVP) is a method used by most of the recent digital speed reading systems. Single words flash on the screen so you're concentrating on a single word at a time. As you get used to the system, you speed up how fast the display shows you words. You can see an RSVP method called Spritz in action in the GIF above.\n\nIf you're curious about your own reading speed, you can find yours with this test offered by Staples.\n\nHow Speed Reading Affects Comprehension\n\nSpeed reading is a nice idea, and the ability to see 1000 words a minute is possible. However, you don't truly understand those words. Research is pretty limited here, but Keith Rayner's "Eye movements and information processing during reading" is one of the more comprehensive looks at how our eyes work when we're reading. Rayner believes speed reading claims are nonsense because our eyes can't work that way:\n\nYou can probably push yourself to get a little over 500 words per minute, but you're limited by the eyes and the anatomy of the retina. To understand text you need to move your eyes to put the fovea on the part of the text you want to focus. Acuity drops off pretty markedly outside the fovea and you can't discriminate the words and text far from the fovea. So, that's the rate limited factor, as is how fast the brain can process information.\n\nWhen it comes to eliminating subvocalization with techniques like meta guiding, Rayner points out you quickly lose comprehension:\n\nYou can practice going faster and you probably will, but when you start going too fast you'll start losing comprehension. Most speed reading methods involve getting rid of subvocalization. Research shows that when you do that and the text is difficult, comprehension goes to pieces.\n\nAs for methods like Ferriss' that require you to read multiple lines at once? Rayner says it doesn't work:\n\nThe other claim is that you can take in more information per eye fixation, but there's no evidence that says we can do that. What we know about the physiology of the retina is against the notion that you can take in two lines of text at the same time.\n\nAnd finally, the digital system, RSVP, has a serious problem with working memory:\n\nThen with RSVP, words come pretty fast, but working memory gets overloaded and words come in faster than you can deal with them.\n\nStudies show that as reading speed increases, comprehension drops. This means you're not taking in the information, which defeats the purpose of reading. With RSVP (and the apps that use it) you don't have the ability to look back to reread text and you overload short term memory so you don't remember as much.\n\nOf course, counter arguments exist. Most recently, research conducted by the speed reading app Spritz counters Rayner's research. Spritz claims that since their system allows your eyes to rest on a single point you can read faster. That could be true, but it doesn't account for Rayner's working memory problem.\n\nSpritz also isn't sharing how their research was done or how many people were part of their study. In my hunt for studies backing up speed reading claims, I found most research was done by the companies who sell the speed reading methods. In the case of Tim Ferriss' technique, he's using ideas grounded in science, but I couldn't find research beyond Ferriss' own claims on his blog post.\n\nSo, in short: Speed reading anything you need to truly comprehend is probably a bad idea. However, if you have a few documents you need to get through or you're reading something that isn't that important, these methods can still be worthwhile. Just know that you won't become a super-fast reading comprehension machine.`
    }
  },
  computed: {
    active () { return this.$store.state.active },
    playing () { return this.$store.state.playing }
  },
  methods: {
    read () { this.$store.dispatch('read', this.text) },
    update (value) { this.$store.dispatch('skipTo', value) },
    control (e) {
      switch (e.which) {
        case 27: // escape
          this.$store.dispatch('stop')
          break
        case 13: // enter
          e.ctrlKey && this.read()
          break
        case 32: // space
          this.active && (
            this.playing
              ? this.$store.dispatch('pause')
              : this.$store.dispatch('play')
          )
          break
        case 37: // left
          if (e.ctrlKey) this.$store.dispatch('skip', 'PREV_PARAGRAPH')
          else this.$store.dispatch('skip', 'PREV_SENTENCE')
          break
        case 38: // up
          this.$store.dispatch('speed', 'UP')
          break
        case 39: // right
          if (e.ctrlKey) this.$store.dispatch('skip', 'NEXT_PARAGRAPH')
          else this.$store.dispatch('skip', 'NEXT_SENTENCE')
          break
        case 40: // down
          this.$store.dispatch('speed', 'DOWN')
          break
      }
    }
  }
}
</script>

<style scoped>
  textarea {
    display: block;
    font-size: 14px;
    font-family: 'Ubuntu Mono';
    height: 400px;
    line-height: 1;
    margin: 0 auto;
    max-width: 700px;
    overflow: auto;
    padding: 1rem;
    resize: none;
    width: 100%;
  }
</style>
