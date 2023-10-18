export default class PromptConcept {
  public readonly prompts = [
    "Write about a time when you laughed uncontrollably.",
    "Appreciate a friend who lives far away but is dear to you.",
    "What is the best gift that you have ever received?",
    "Write about a movie that touched your heart, and why.",
    "Write about someone that you really admire.",
    "Appreciate a refreshing walk that you had in nature.",
    "What do you like most about yourself?",
    "What do you love most about the time you are living in?",
    "Express gratitude for having as much food as you need.",
    "Appreciate the vehicles that let you travel long distances.",
    "Express gratitude for the facility of ordering food at your doorstep and the people who deliver it.",
    "Look around and list 5 things that help you in your day-to-day life.",
    "List 5 ways that having a mobile phone makes your life easier.",
    "Express gratitude for 5 things that you use daily.",
  ];

  private currentPrompt = "";
  async getRandomPrompt() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.prompts.length);
    } while (this.prompts[randomIndex] === this.currentPrompt);

    this.currentPrompt = this.prompts[randomIndex];
    return this.prompts[randomIndex];
  }
}
