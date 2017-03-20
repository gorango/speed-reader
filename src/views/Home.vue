<template lang="pug">
  div.flex.flex-column
    div
      speed-reader.m4(:v='v2.v', :text='v1.text', :display='v1.display', :control='v2.control')
      speed-reader.m4(:v='v2.v', :text='v1.text', :display='v2.display', :control='v1.control')
</template>

<script>
import { SpeedReader } from '../modules/speed-reader'

export default {
  name: 'home-view',
  components: {
    SpeedReader
  },
  data () {
    return {
      v1: {
        v: '1',
        display: 'guide',
        control: true,
        text: `Speed reading is any of several techniques used to improve one's ability to read quickly. Speed reading methods include chunking and minimizing subvocalization. The many available speed reading training programs include books, videos, software, and seminars.\n\n\nHistory\n\nPsychologists and educational specialists working on visual acuity used a tachistoscope to conclude that, with training, an average person could identify minute images flashed on the screen for only one five-hundredth of a second (2 ms). Though the images used were of airplanes, the results had implications for reading.\n\nIt was not until the late 1950s that a portable, reliable and convenient device would be developed as a tool for increasing reading speed. Evelyn Wood, a researcher and schoolteacher, was committed to understanding why some people were naturally faster at reading and tried to force herself to read very quickly. In 1958, while brushing off the pages of a book she had thrown down in despair, she discovered that the sweeping motion of her hand across the page caught the attention of her eyes, and helped them move more smoothly across the page. She then used the hand as a pacer. Wood first taught the method at the University of Utah, before launching it to the public as Evelyn Wood's Reading Dynamics in Washington, D.C. in 1959.\n\n\nEffect on comprehension\n\nSkimming alone may not be ideal when complete comprehension of the text is the main objective. Skimming is mainly used when researching and getting an overall idea of the text. Nonetheless, when time is limited, skimming or skipping over text can aid comprehension. Duggan & Payne (2009) compared skimming with reading normally, given only enough time to read normally through half of a text. They found that the main points of the full text were better understood after skimming (which could view the full text) than after normal reading (which only read half the text). There was no difference between the groups in their understanding of less important information from the text.\n\nIn contrast, other findings suggest that speed reading courses which teach techniques that largely constitute skimming of written text result in a lower comprehension rate (below 50% comprehension on standardized comprehension tests).\n\nHyo Sang Shin (2012) in his book "Visual Reading and the Snowball of Understanding" claims that increasing one's reading speed does not lead to decreased comprehension. On the contrary, he argues that the faster the reading speed the better the comprehension. That phenomenon is described by Shin (2012) as a non zero-sum game between the reading speed and comprehension. Arvin Vohra, in "Introduction to Speed Reading and Rapid Analytical Reading" claims that grammar based speed reading can lead to a simultaneous increase in speed and comprehension. Just as moving from letter by letter reading in early childhood to word by word reading in later childhood increases speed and comprehension, he argues that reading clause by clause or phrase by phrase can cause a similar increase in speed and comprehension.\n\n\nSoftware\n\nComputer programs are available to help instruct speed reading students. Some programs present the data as a serial stream, since the brain handles text more efficiently by breaking it into such a stream before parsing and interpreting it. The 2000 National Reading Panel (NRP) report seems to support such a mechanism.\n\nTo increase speed, some older programs required readers to view the center of the screen while the lines of text around it grew longer. They also presented several objects (instead of text) moving line by line or bouncing around the screen; users had to follow the object(s) with only their eyes. A number of researchers criticize using objects instead of words as an effective training method, claiming that the only way to read faster is to read actual text. Many of the newer speed reading programs use built-in text, and they primarily guide users through the lines of an on-screen book at defined speeds. Often the text is highlighted to indicate where users should focus their eyes; they are not expected to read by pronouncing the words, but instead to read by viewing the words as complete images. The exercises are also intended to train readers to eliminate subvocalization, though it has not been proven that this will increase reading speed.`
      },
      v2: {
        v: '2',
        display: 'flash',
        control: false,
        text: `Hello there motherfucker`
      }
    }
  }
}
</script>

<style lang="css">
</style>
