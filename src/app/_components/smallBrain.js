export function smallBrain(text) {
  const lower = text.toLowerCase().trim();

  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  if (/\b(sad|bad|upset|tired|angry|bored)\b/.test(lower))
    return [
      "I’m sorry to hear that. Maybe a walk in the wild would lift your mood 🌿",
      "Tough days happen. Want me to share something relaxing from the wilderness? 🌄",
      "Sometimes a deep breath helps. You’ve got this 💪",
    ].random();

  if (/\b(happy|great|awesome|good|amazing|excited)\b/.test(lower))
    return [
      "That’s wonderful! 😊 Keep that good energy going.",
      "Love to hear that! Positive vibes only 🌞",
      "That’s awesome — I’m smiling in binary 🤖",
    ].random();

  if (/\b(book|reserve|room|stay)\b/.test(lower))
    return "I can help guide you on booking your stay — would you like a deluxe or wilderness cabin? 🏕️";

  if (/\b(food|menu|restaurant|dinner|breakfast)\b/.test(lower))
    return "Our on-site restaurant serves fresh, local dishes 🌾 Would you like me to suggest today’s chef special? 🍽️";

  if (/\b(activities|adventure|trek|hike|camp|explore)\b/.test(lower))
    return "We have guided hikes, bonfires, and forest trails 🌲 Which kind of adventure are you in the mood for?";

  if (/\b(spa|relax|massage)\b/.test(lower))
    return "Our nature spa is perfect for unwinding 🌸 Want me to tell you about our signature herbal therapy?";

  if (/\b(hi|hello|hey|hola|yo)\b/.test(lower))
    return ["Hey there 👋", "Hello! How’s your day going?", "Hi! 😊"].random();

  if (/how are you/.test(lower))
    return [
      "I’m just a bunch of clever code, but feeling great today! 🤖",
      "Doing fantastic! How about you?",
    ].random();

  if (/who (are|r) you/.test(lower))
    return [
      "I’m your friendly AI concierge — think of me as your digital wilderness guide 🌲",
      "I’m an AI created to make your stay at The Wilderness amazing 🤖",
    ].random();

  if (/thank(s| you)/.test(lower))
    return ["You’re very welcome! 😊", "Anytime!", "Glad I could help! 🙌"].random();

  if (/weather|temperature/.test(lower))
    return [
      "I can’t check real-time weather yet 🌦️, but it’s always cozy inside The Wilderness.",
      "I’d guess it’s perfect campfire weather 🔥",
    ].random();

  if (/\b(ok|okay|fine|cool|sure)\b/.test(lower))
    return ["Got it 👍", "Alright!", "Cool, let’s continue!"].random();

  if (/\b(joke|funny)\b/.test(lower))
    return [
      "Why did the forest tree get promoted? Because it was outstanding in its field! 🌳😂",
      "I tried to tell a camping joke, but it was in-tents! 🏕️",
    ].random();

  if (
    /\b(bye|goodbye|see you|see ya|ok bye|thanks bye|take care|thik hai|chalta hu|chalti hu|phir milte)\b/.test(
      lower
    )
  )
    return [
      "🌿 Take care! Hope to see you again at The Wilderness soon!",
      "Goodbye! Have a relaxing day ahead 🌞",
      "Bye for now! The forest awaits whenever you return 🌲",
      "👋 Safe travels! I’ll be here whenever you want to chat again.",
      "It was lovely talking to you. Enjoy your day! 🌸",
    ].random();

  const curiosity = [
    "That’s an interesting thought — tell me more! 🤔",
    "Hmm, that sounds exciting! Want to elaborate?",
    "I love where this is going, tell me more 🌿",
  ];
  const reflection = [
    "That’s deep... makes me think. 🌙",
    "You have an interesting perspective on that!",
    "I never thought of it that way 🤖",
  ];
  const general = [
    "Tell me more about that! 👀",
    "I’m curious — what made you think of that?",
    "That’s cool. Want to chat about something else?",
  ];

  const moods = [curiosity, reflection, general];
  const mood = moods[Math.floor(Math.random() * moods.length)];
  return mood.random();
}
