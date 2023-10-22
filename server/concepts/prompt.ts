import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";

export interface PromptDoc extends BaseDoc {
  user: ObjectId;
  promptIndex: number;
}
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
    "Appreciate the vehicles that let you travel long distances.",
    "Express gratitude for the facility of ordering food at your doorstep and the people who deliver it.",
    "Look around and list 5 things that help you in your day-to-day life.",
    "List 5 ways that having a mobile phone makes your life easier.",
    "Express gratitude for 5 things that you use daily.",
    "When do you feel most alive?",
    "What made you smile today?",
    "When you can't sleep at night, what are you thinking about?",
    "What activities tend to anchor you in the present moment?",
    "Close your eyes for three minutes and count your breaths. What thoughts came up while you did this?",
    "Describe an activity that makes you feel really, truly happy.",
    "What were you worried about this time last year? Are you still worried about that now?",
    "Write a letter to your younger self. What advice would you give him or her?",
    "What does your best friend or partner feel anxious about? Is it the same things you feel anxious about?",
    "If you moved to a new place — it can be anywhere in the world — do you think you would still experience anxiety? Why or why not?",
    "How do you feel when you sit quietly for five or ten minutes?",
    "Close your eyes and imagine a peaceful, calm place. Where is that place?",
    "What does your current morning routine look like? How could you change it?",
    "Write about something you're looking forward to.",
    "What does personal growth mean to you?",
    "Where do you hope to be 10 years from now?",
    "Who do you most admire? Why?",
    "What can you do differently tomorrow?",
    "How often do you do things that get you outside your comfort zone?",
    "Do you have a hobby? How do you feel when you're engaged with it?",
    "Do you like your job? How do you typically feel during your workday?",
    "What can you do today that your future self will thank you for?",
    "How do you feel when you sit quietly, without the distraction of technology or TV?",
    "What's something you resisted today, or in the past week? Why do you think you resisted it?",
    "What is something that you can do today that people 30 years ago couldn't?",
    "Write about an electronic device that you feel grateful to have.",
    "What is one thing about the Internet that you admire?",
    "Think about the people you don't know who help make your life easier.",
    "List 5 things in your bedroom that you are grateful for.",
    "Express gratitude for 5 tools that help you save time.",
    "What privilege do you enjoy that others might not?",
    "Write about a song that you can't help but sing along to.",
    "What is your favorite thing to do in your free time?",
    "What was the most enjoyable part of your childhood?",
    "What aspect of your health do you feel grateful for?",
    "Whose company do you like the most?",
    "What excites you about the future?",
    "Who is the most reliable person in your life?",
    "When did something wonderful happen unexpectedly?",
    "What was a time you observed a stranger that was helping someone in need?",
    "Write about the most influential people in your life.",
    "Write about an achievement that you are most proud of.",
    "Write about something that makes you feel lucky.",
    "Write about a recent improvement in your lifestyle.",
    "Write about something beautiful that moved you to tears.",
    "What is the funniest video you've watched recently?",
    "Write about a time when you challenged your comfort zone.",
    "What is your favorite part about your town or city?",
    "What do you like about growing up?",
    "Which is your favorite weather, and why?",
    "What is the most fascinating thing about life?",
    "What is one skill or quality about yourself that you appreciate the most?",
    "Express gratitude to yourself and the journey you're having.",
    "Write about someone that you idolize, and why.",
    "What are you always excited to do?",
    "What is your strongest life value?",
    "Write about one positive thing that happened today.",
    "What is your favorite part of your life?",
    "Which recent experience in life taught you a big lesson?",
    "What is your most prized possession?",
    "Write about a day when you felt really happy.",
    "What does spirituality mean to you?",
    "What is your favorite part about nature?",
    "Write about a song that always comforts you.",
    "What are your favorite things to eat?",
    "Where do you feel most happy and relaxed?",
    "Write about the person that you like the most. How do you feel about them?",
    "Which tool do you use most frequently to get your tasks done? (mobile phone, pen, Internet, transport, utensils, etc.)",
    "What happened in the last week that made you laugh out loud?",
    "Why did you start gratitude journaling? Express gratitude to yourself for taking this step.",
    "What is one part of your life that you won't trade for anything?",
    "Which activity do you enjoy doing the most?",
    "What is a lesson in your life that has helped you?",
    "When did someone smile or laugh because of you? How did that make you feel?",
    "Who is the person in your life that you'll call in an emergency?",
    "What is something that was hard to do but you did it anyway?",
    "Write about a time you were grateful for something a loved one did for you.",
    "Write a thank-you note to yourself.",
    "Pick a random photo, and write about why you’re grateful for that memory.",
    "Write about a person who helped you through a tough situation.",
    "Look around you and find something that you can feel grateful for, no matter how small.",
    "What is something that always gives you happiness?",
    "How does practicing gratitude impact your thoughts?",
    "Express gratitude for how you've grown and developed through the years.",
    "What is something that you are looking forward to in your life?",
    "Remember a time when someone listened to you and empathized with you as you needed them to.",
    "Appreciate yourself for building the habit of gratitude to live a happier life.",
    "Take a moment to appreciate a fond memory that always brings a smile to your face.",
    "Express gratitude for the time you achieved a goal with your willingness and effort.",
    "How have you supported people throughout your life? Remember a time when you helped someone in need.",
    "What is something that you turn to when you need comfort?",
    "Take a deep breath and feel grateful to be who you are, right where you are.",
    "What is a special memory from your childhood?",
    "Write and share a Letter of Gratitude to someone who has been your well-wisher.",
    "What is one thing that you do for yourself that enriches your health?",
    "Reflect through the week and write about moments that made you happy.",
    "What are the steps that you have taken through the years that made you a better version of yourself?",
    "Write about someone who has mentored you and taught you important lessons.",
    "Choose 3 people to say thanks today. Write about why you are thankful to them.",
    "Write about something valuable that you learned this week.",
    "Describe a family tradition that you are most grateful for.",
    "Who is a teacher or mentor that has made an impact on your life, and how did they help you?",
    "Write about someone you’ve never met but who has enriched your life in some way.",
    "What part of your life has changed for the better over the past year?",
    "Describe the last time someone helped you solve a problem at work or personal tasks.",
    "What is your favorite part of your daily routine?",
    "What are some great words that you read recently?",
    "What is your favorite holiday, and why do you love it?",
    "What is your favorite TV show, and why do you love it?",
    "Write about a recent obstacle you faced and how you overcame it.",
    "Write about someone who makes your life better.",
  ];
  public readonly userPrompts = new DocCollection<PromptDoc>("userPrompts");

  async getRandomPrompt(userId: ObjectId) {
    const existingUser = await this.userPrompts.readOne({ user: userId });
    if (existingUser) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * this.prompts.length);
      } while (randomIndex === existingUser.promptIndex);
      await this.userPrompts.updateOne({ user: userId }, { promptIndex: randomIndex });
      return this.prompts[randomIndex];
    } else {
      return this.initializePrompt(userId);
    }
  }

  async getCurrentPrompt(userId: ObjectId) {
    const existingUser = await this.userPrompts.readOne({ user: userId });
    if (existingUser) {
      return this.prompts[existingUser.promptIndex];
    } else {
      return this.initializePrompt(userId);
    }
  }

  async initializePrompt(userId: ObjectId) {
    const randomIndex = Math.floor(Math.random() * this.prompts.length);
    await this.userPrompts.createOne({ user: userId, promptIndex: randomIndex });
    return this.prompts[randomIndex];
  }
}
