import { useState, useEffect } from "react";
import { sounds } from "./sounds.js";

/* ── Question Bank (12 categories × 5 tiers × 3 questions each) ── */
const QUESTION_BANK = {
  "Characters": {
    200: [
      { q: "This man was swallowed by a great fish after running from God's call.", a: "Jonah" },
      { q: "This shepherd boy killed a giant with a sling and a stone before becoming Israel's greatest king.", a: "David" },
      { q: "He received the Ten Commandments on Mount Sinai and led Israel out of Egypt.", a: "Moses" },
    ],
    400: [
      { q: "He was Israel's first king — chosen by God but later rejected for his disobedience.", a: "King Saul" },
      { q: "Israel's wisest king, he built the first temple in Jerusalem.", a: "Solomon" },
      { q: "Known as the 'father of faith,' he left his homeland at God's command not knowing where he was going.", a: "Abraham" },
    ],
    600: [
      { q: "This man wrestled with God all night and walked away with both a limp and a brand new name.", a: "Jacob (Israel)" },
      { q: "Israel's strongest man, he lost his power when his hair was cut by a woman.", a: "Samson" },
      { q: "He spent a night in a den of hungry lions and walked out completely unharmed.", a: "Daniel" },
    ],
    800: [
      { q: "He was sold into slavery by his own brothers but rose to become second-in-command of all Egypt.", a: "Joseph" },
      { q: "God told this man to build a massive boat and fill it with animals before a great flood.", a: "Noah" },
      { q: "Known as the 'weeping prophet,' he was thrown into a muddy well for delivering God's unpopular message.", a: "Jeremiah" },
    ],
    1000: [
      { q: "This prophet called down fire from heaven on Mount Carmel to defeat 450 false prophets.", a: "Elijah" },
      { q: "This man rebuilt the walls of Jerusalem in just 52 days despite fierce opposition.", a: "Nehemiah" },
      { q: "God told this prophet to lie on his left side for 390 days and his right side for 40 days as a prophetic sign.", a: "Ezekiel" },
    ],
  },
  "Life of Jesus": {
    200: [
      { q: "In what town was Jesus born?", a: "Bethlehem" },
      { q: "In what town did Jesus grow up?", a: "Nazareth" },
      { q: "What was the name of Jesus' earthly mother?", a: "Mary" },
    ],
    400: [
      { q: "What was Jesus' very first recorded miracle?", a: "Turning water into wine (wedding at Cana)" },
      { q: "What did Jesus say to calm a violent storm on the Sea of Galilee?", a: "\"Peace, be still\"" },
      { q: "Jesus called His first disciples from this occupation.", a: "Fishermen" },
    ],
    600: [
      { q: "Jesus fasted for how many days in the wilderness before being tempted by Satan?", a: "40 days" },
      { q: "What famous sermon did Jesus preach on a hillside that began with the Beatitudes?", a: "The Sermon on the Mount" },
      { q: "Jesus said 'I am the way, the truth, and the life' in which Gospel?", a: "John (John 14:6)" },
    ],
    800: [
      { q: "What did Jesus say when He was 12 and His parents found Him in the temple?", a: "That He must be about His Father's business (Luke 2:49)" },
      { q: "Jesus rode into Jerusalem on what animal on Palm Sunday?", a: "A donkey (a colt, the foal of a donkey)" },
      { q: "When the Pharisees brought a woman caught in adultery to Jesus, what did He do before speaking?", a: "He bent down and wrote in the dirt/ground with His finger (John 8:6)" },
    ],
    1000: [
      { q: "Name the three disciples Jesus took with Him to the Garden of Gethsemane the night He was arrested.", a: "Peter, James, and John" },
      { q: "According to John 19:30, what were Jesus' final words on the cross?", a: "\"It is finished\"" },
      { q: "According to 1 Corinthians 15:6, Jesus appeared to more than how many people at one time after His resurrection?", a: "Over 500 people" },
    ],
  },
  "Miracles": {
    200: [
      { q: "Jesus fed over 5,000 people with this tiny meal.", a: "5 loaves and 2 fish" },
      { q: "Jesus turned water into wine at a wedding in this town.", a: "Cana" },
      { q: "God provided this bread-like food from heaven to feed the Israelites in the desert.", a: "Manna" },
    ],
    400: [
      { q: "Jesus raised this man from the dead after he had already been in the tomb for four days.", a: "Lazarus" },
      { q: "Jesus healed 10 lepers — but only one came back to say thank you. What nationality was he?", a: "He was a Samaritan (Luke 17:16)" },
      { q: "God caused the walls of this city to fall after Israel marched around it for seven days.", a: "Jericho" },
    ],
    600: [
      { q: "God parted this body of water so Moses and the Israelites could escape Egypt on dry ground.", a: "The Red Sea" },
      { q: "Elisha healed the leprosy of this Syrian army commander by telling him to dip in the Jordan River seven times.", a: "Naaman (2 Kings 5)" },
      { q: "Jesus healed a man who had been unable to walk for how many years, at the Pool of Bethesda?", a: "38 years (John 5:5)" },
    ],
    800: [
      { q: "Peter walked on water briefly — but sank when he did this one thing. What was it?", a: "He took his eyes off Jesus and looked at the storm (he doubted)" },
      { q: "What happened immediately when Paul was bitten by a deadly snake on the island of Malta?", a: "Nothing — he shook it off and was unharmed (Acts 28)" },
      { q: "God struck this man dead for reaching out to steady the Ark of the Covenant when the oxen stumbled.", a: "Uzzah (2 Samuel 6:7)" },
    ],
    1000: [
      { q: "What miracle did Elisha perform for a widow involving jars of oil?", a: "He multiplied her small amount of oil to fill every jar she had (2 Kings 4)" },
      { q: "Elijah prayed and it stopped raining. How long did the drought last?", a: "Three and a half years (James 5:17)" },
      { q: "What miracle happened inside the temple at the exact moment Jesus died on the cross?", a: "The veil (curtain) of the temple was torn in two from top to bottom" },
    ],
  },
  "Women of the Bible": {
    200: [
      { q: "This woman said 'wherever you go, I will go' to her mother-in-law.", a: "Ruth" },
      { q: "This woman hid two Israelite spies on her rooftop in Jericho and was saved when the city fell.", a: "Rahab" },
      { q: "She was a seller of purple fabric in Philippi and became Paul's first European convert.", a: "Lydia (Acts 16)" },
    ],
    400: [
      { q: "She was the first person to speak to Jesus after His resurrection.", a: "Mary Magdalene" },
      { q: "She was Moses' sister who led the women in a song of praise after crossing the Red Sea.", a: "Miriam" },
      { q: "This wife of Abraham laughed out loud when she overheard that she would have a son in old age.", a: "Sarah" },
    ],
    600: [
      { q: "This queen risked her life approaching the king uninvited to save her people from genocide.", a: "Esther" },
      { q: "She anointed Jesus' feet with expensive perfume and wiped them with her hair.", a: "Mary of Bethany (John 12)" },
      { q: "She was the first female judge in Israel and also a prophetess.", a: "Deborah" },
    ],
    800: [
      { q: "This woman nagged Samson relentlessly until he finally revealed the secret of his strength.", a: "Delilah" },
      { q: "This prophetess recognized the infant Jesus in the temple and spoke about Him to everyone who was waiting for redemption.", a: "Anna (Luke 2:36-38)" },
      { q: "She was a tentmaker and, along with her husband Aquila, took Apollos aside and explained the way of God more accurately.", a: "Priscilla (Acts 18:26)" },
    ],
    1000: [
      { q: "This woman in the early church was struck dead for lying about how much money she gave to God.", a: "Sapphira (Acts 5)" },
      { q: "Proverbs 31 says a virtuous woman is worth far more than what precious stone?", a: "Rubies (Proverbs 31:10)" },
      { q: "This woman was the mother-in-law of Ruth. After losing her husband and both sons, she told people to call her 'Mara,' meaning bitter.", a: "Naomi (Ruth 1:20)" },
    ],
  },
  "Numbers & Facts": {
    200: [
      { q: "How many days and nights did it rain during Noah's flood?", a: "40 days and 40 nights" },
      { q: "How many commandments did God give Moses on Mount Sinai?", a: "10 commandments" },
      { q: "How many days was Jesus in the tomb before rising from the dead?", a: "3 days" },
    ],
    400: [
      { q: "How many books are in the entire Bible?", a: "66 books" },
      { q: "How many Psalms are in the book of Psalms?", a: "150 Psalms" },
      { q: "How many pieces of silver was Jesus betrayed for?", a: "30 pieces of silver" },
    ],
    600: [
      { q: "How many disciples did Jesus choose?", a: "12" },
      { q: "How many years did the Israelites wander in the desert before entering the Promised Land?", a: "40 years" },
      { q: "How many fruits of the Spirit does Paul list in Galatians 5?", a: "9 (love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control)" },
    ],
    800: [
      { q: "How many plagues did God send on Egypt before Pharaoh let the Israelites go?", a: "10 plagues" },
      { q: "Paul says he received 'forty lashes minus one' how many times from the Jewish leaders?", a: "Five times (2 Corinthians 11:24)" },
      { q: "In Revelation, what is the number of the beast?", a: "666 (Revelation 13:18)" },
    ],
    1000: [
      { q: "Methuselah is the oldest person in the Bible. How old was he when he died?", a: "969 years old (Genesis 5:27)" },
      { q: "After the resurrection, Jesus told the disciples to cast their net on the right side. How many fish did they haul in?", a: "153 fish (John 21:11)" },
      { q: "According to Revelation, how many gates does the New Jerusalem have?", a: "12 gates — one for each tribe of Israel (Revelation 21:12)" },
    ],
  },
  "The Early Church": {
    200: [
      { q: "On what special day did the Holy Spirit first fall on the disciples in the upper room?", a: "Pentecost (Acts 2)" },
      { q: "Approximately how many people were baptized and added to the church on the day of Pentecost?", a: "About 3,000 people (Acts 2:41)" },
      { q: "What two visible and audible signs confirmed the arrival of the Holy Spirit at Pentecost?", a: "Tongues of fire and the sound of a mighty rushing wind (Acts 2)" },
    ],
    400: [
      { q: "This man held the coats of those who stoned Stephen — and later became the greatest missionary in history.", a: "Saul (Paul)" },
      { q: "Who was the first Christian martyr, killed by stoning while he saw a vision of heaven?", a: "Stephen (Acts 7)" },
      { q: "An angel freed Peter from prison. When he knocked at the door, who answered and was so stunned she left him standing outside?", a: "Rhoda (Acts 12:13)" },
    ],
    600: [
      { q: "Peter and John told a lame man they had no silver or gold. What did they give him instead?", a: "Healing in the name of Jesus Christ (Acts 3:6)" },
      { q: "Philip was led by the Spirit to explain Isaiah 53 to a royal official from this African kingdom.", a: "Ethiopia (Acts 8)" },
      { q: "Peter first shared the Gospel with Gentiles when he visited the home of this Roman centurion.", a: "Cornelius (Acts 10)" },
    ],
    800: [
      { q: "An angel freed this apostle from prison the night before his scheduled execution while believers prayed.", a: "Peter (Acts 12)" },
      { q: "Paul and Silas were singing hymns in a Philippian jail at midnight when this happened.", a: "An earthquake shook the prison and all the doors flew open (Acts 16)" },
      { q: "Who baptized Paul (then Saul) after he was blinded on the road to Damascus?", a: "Ananias (Acts 9:17-18)" },
    ],
    1000: [
      { q: "What was the name of the city where followers of Jesus were first called 'Christians'?", a: "Antioch (Acts 11:26)" },
      { q: "Paul was shipwrecked on which island while being transported to Rome as a prisoner?", a: "Malta (Acts 28)" },
      { q: "What problem in the early Jerusalem church led to the appointment of the first seven deacons?", a: "Greek-speaking widows were being overlooked in the daily food distribution (Acts 6)" },
    ],
  },
  "Prophets": {
    200: [
      { q: "This prophet said to God: 'I am only a child — I do not know how to speak.'", a: "Jeremiah (Jeremiah 1:6)" },
      { q: "This prophet was taken up to heaven in a chariot of fire without ever dying.", a: "Elijah (2 Kings 2)" },
      { q: "This prophet spent three days inside a great fish before being sent to preach in Nineveh.", a: "Jonah" },
    ],
    400: [
      { q: "This prophet had a vision of a valley full of dry bones that came back to life as a mighty army.", a: "Ezekiel (Ezekiel 37)" },
      { q: "God told this prophet to marry an unfaithful woman as a living picture of Israel's unfaithfulness to God.", a: "Hosea" },
      { q: "This prophet saw a vision of God seated on a high throne, surrounded by six-winged seraphim crying 'Holy, holy, holy.'", a: "Isaiah (Isaiah 6)" },
    ],
    600: [
      { q: "This prophet foretold the exact birthplace of the Messiah 700 years before Jesus was born.", a: "Micah (Micah 5:2 — Bethlehem)" },
      { q: "Isaiah 53 describes a 'suffering servant' in stunning detail. Name one thing it predicts that was fulfilled at the crucifixion.", a: "Pierced for our sins / led like a lamb to slaughter / bore our iniquities / beaten and crushed" },
      { q: "God told this prophet to eat a scroll that tasted sweet as honey in his mouth, then go speak to Israel.", a: "Ezekiel (Ezekiel 3)" },
    ],
    800: [
      { q: "Jonah preached in this wicked Assyrian capital city — and the entire population repented in sackcloth.", a: "Nineveh" },
      { q: "Daniel interpreted a terrifying dream for this king — a statue made of gold, silver, bronze, iron, and clay.", a: "King Nebuchadnezzar (Daniel 2)" },
      { q: "God commanded this prophet to walk barefoot and without clothes for three years as a sign to Egypt and Ethiopia.", a: "Isaiah (Isaiah 20:3)" },
    ],
    1000: [
      { q: "This is traditionally considered the last Old Testament prophet, and his book ends the OT with a promise about Elijah's return.", a: "Malachi" },
      { q: "Before he ascended, Elijah asked Elisha what he wanted. What was Elisha's bold request?", a: "A double portion of Elijah's spirit (2 Kings 2:9)" },
      { q: "Which minor prophet foretold that the Messiah would be called out of Egypt — fulfilled when Mary and Joseph fled there with Jesus?", a: "Hosea (Hosea 11:1, quoted in Matthew 2:15)" },
    ],
  },
  "Psalms & Proverbs": {
    200: [
      { q: "Which Psalm begins with 'The Lord is my shepherd; I shall not want'?", a: "Psalm 23" },
      { q: "Proverbs 3:5 says 'Trust in the Lord with all your heart and lean not on your own ___.' Fill in the blank.", a: "Understanding" },
      { q: "Complete this Psalm: 'This is the day the Lord has made; let us _____ and be glad in it.'", a: "Rejoice (Psalm 118:24)" },
    ],
    400: [
      { q: "Psalm 119 is the longest chapter in the Bible. What subject does every single verse reference?", a: "God's Word / His law / scripture" },
      { q: "Proverbs 22:6 says 'Train up a child in the way he should go, and when he is old he will not do what?'", a: "Depart from it" },
      { q: "Psalm 100 says 'Enter His gates with _____ and His courts with praise.' Fill in the blank.", a: "Thanksgiving" },
    ],
    600: [
      { q: "Psalm 22 begins with the same words Jesus cried out on the cross. What are those words?", a: "\"My God, my God, why have you forsaken me?\"" },
      { q: "Proverbs 16:18 says 'Pride goes before destruction, and a _____ spirit before a fall.' Fill in the blank.", a: "Haughty" },
      { q: "David wrote Psalm 51 as a prayer of repentance after which specific sin?", a: "His adultery with Bathsheba and the murder of her husband Uriah" },
    ],
    800: [
      { q: "Proverbs 4:23 says 'Above all else, guard your _____, for everything you do flows from it.'", a: "Heart" },
      { q: "In Psalm 46:10, what does God say to do — and then know that He is God?", a: "Be still (\"Be still, and know that I am God\")" },
      { q: "Proverbs 27:17 says 'As iron sharpens iron, so one person _____ another.' Fill in the blank.", a: "Sharpens" },
    ],
    1000: [
      { q: "How many Psalms in the Bible are traditionally attributed to King David?", a: "73 Psalms" },
      { q: "Psalm 119 is the longest chapter in the entire Bible. How many verses does it have?", a: "176 verses" },
      { q: "Psalm 22:18 contains a prophecy fulfilled at the crucifixion. What does it say soldiers would do with the author's clothing?", a: "They would divide his garments and cast lots for his clothing" },
    ],
  },
  "Creation & Genesis": {
    200: [
      { q: "On which day of creation did God make human beings?", a: "Day 6" },
      { q: "What was the sign of God's covenant with Noah after the flood?", a: "A rainbow" },
      { q: "What was the name of the garden where Adam and Eve first lived?", a: "The Garden of Eden" },
    ],
    400: [
      { q: "What were the names of Adam and Eve's first two sons?", a: "Cain and Abel" },
      { q: "God confused the languages of humanity at this famous unfinished structure.", a: "The Tower of Babel" },
      { q: "What part of Adam's body did God use to create Eve?", a: "A rib" },
    ],
    600: [
      { q: "God told Abraham to sacrifice his son on a mountain. What was the son's name, and what did God provide instead?", a: "Isaac; God provided a ram (Genesis 22)" },
      { q: "What were the names of the two special trees in the middle of the Garden of Eden?", a: "The Tree of Life and the Tree of the Knowledge of Good and Evil" },
      { q: "How old was Abraham when his son Isaac was born?", a: "100 years old (Genesis 21:5)" },
    ],
    800: [
      { q: "God changed Abram's name to Abraham. What does the name Abraham mean?", a: "Father of many nations" },
      { q: "Joseph interpreted two dreams in prison for two of Pharaoh's officials. What were their job titles?", a: "The cupbearer (butler) and the baker" },
      { q: "Lot's wife disobeyed the angel's command and looked back at Sodom. What happened to her?", a: "She turned into a pillar of salt (Genesis 19:26)" },
    ],
    1000: [
      { q: "How many chapters are in the book of Genesis?", a: "50 chapters" },
      { q: "God destroyed two wicked cities in Genesis. Name both of them.", a: "Sodom and Gomorrah" },
      { q: "Before being called by God, Abraham's father Terah set out for Canaan but stopped and settled in a different city. Which city?", a: "Haran (Genesis 11:31)" },
    ],
  },
  "Kings & Kingdoms": {
    200: [
      { q: "Who defeated the giant Goliath with a sling and a stone?", a: "David" },
      { q: "Who was the first king of Israel?", a: "King Saul" },
      { q: "Which king built the first temple in Jerusalem?", a: "Solomon" },
    ],
    400: [
      { q: "King Solomon asked God for wisdom. Name one additional blessing God gave him that he did NOT ask for.", a: "Riches and honor (1 Kings 3:13)" },
      { q: "King Nebuchadnezzar threw three Hebrew men into a fiery furnace. Name any one of their Babylonian names.", a: "Shadrach, Meshach, or Abednego" },
      { q: "The kingdom of Israel split in two after the death of which king?", a: "Solomon" },
    ],
    600: [
      { q: "After Solomon's death, Israel split into two kingdoms. What were the northern and southern kingdoms called?", a: "Israel (north) and Judah (south)" },
      { q: "Elijah challenged the prophets of Baal on Mount Carmel during the reign of which wicked king?", a: "King Ahab" },
      { q: "This king of Judah found the lost Book of the Law in the temple and wept, then launched sweeping reforms.", a: "Josiah (2 Kings 22)" },
    ],
    800: [
      { q: "Which prophet confronted King David about his sin with Bathsheba by telling him a parable about a stolen lamb?", a: "Nathan the prophet (2 Samuel 12)" },
      { q: "King Hezekiah prayed when he was told he would die from illness. How many extra years did God add to his life?", a: "15 years (Isaiah 38:5)" },
      { q: "What was written on the wall at Belshazzar's feast, and what did the words mean?", a: "Mene, Mene, Tekel, Upharsin — your kingdom is numbered, weighed, and divided (Daniel 5)" },
    ],
    1000: [
      { q: "How many kings ruled over the united kingdom of Israel before it split into two?", a: "Three: Saul, David, and Solomon" },
      { q: "Which is the only king in the entire Bible described as 'a man after God's own heart'?", a: "David (1 Samuel 13:14 / Acts 13:22)" },
      { q: "When the Assyrians surrounded Jerusalem and 185,000 of their soldiers were killed overnight, which king of Judah was on the throne?", a: "Hezekiah (2 Kings 19)" },
    ],
  },
  "Paul's Letters": {
    200: [
      { q: "Paul wrote 'I can do all things through Christ who ___.' Fill in the blank.", a: "Strengthens me (Philippians 4:13)" },
      { q: "Paul wrote 'For all have sinned and fall short of the ___ of God.' Fill in the blank.", a: "Glory (Romans 3:23)" },
      { q: "Paul wrote 'The wages of sin is death, but the gift of God is ___ in Christ Jesus.' Fill in the blank.", a: "Eternal life (Romans 6:23)" },
    ],
    400: [
      { q: "Romans 8:28 says 'all things work together for good' for those who meet what condition?", a: "Those who love God / are called according to His purpose" },
      { q: "In what book of the Bible does Paul describe putting on the full armor of God?", a: "Ephesians (Ephesians 6)" },
      { q: "Paul wrote that love 'never fails' in which famous chapter about love?", a: "1 Corinthians 13" },
    ],
    600: [
      { q: "Paul wrote that we are saved by grace through faith — and not by works. In which letter?", a: "Ephesians (Ephesians 2:8-9)" },
      { q: "In Galatians 5, Paul lists the fruit of the Spirit. Name at least four of them.", a: "Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control" },
      { q: "Paul told Timothy that all Scripture is 'God-breathed and useful for' what four purposes?", a: "Teaching, rebuking, correcting, and training in righteousness (2 Timothy 3:16)" },
    ],
    800: [
      { q: "In Philippians 4:7, Paul describes 'the peace of God that ___ all understanding.'", a: "Surpasses (or transcends)" },
      { q: "Paul's shortest letter is about a runaway slave named Onesimus. What is the letter called?", a: "Philemon" },
      { q: "Paul wrote that he had learned the secret of being content in any situation. What does he say he has learned to do?", a: "To be content whether well-fed or hungry, in plenty or in want (Philippians 4:11-12)" },
    ],
    1000: [
      { q: "How many New Testament letters are traditionally attributed to Paul?", a: "13 letters (Romans through Philemon)" },
      { q: "Paul quotes which Old Testament prophet in Romans 1:17 to establish that 'the righteous shall live by faith'?", a: "Habakkuk (Habakkuk 2:4)" },
      { q: "In Romans 11, Paul uses what agricultural image to explain how Gentiles have been included in God's family alongside Israel?", a: "An olive tree — Gentiles are wild branches grafted in (Romans 11:17-24)" },
    ],
  },
};

const ALL_CATEGORIES = Object.keys(QUESTION_BANK);
const POINT_VALUES = [200, 400, 600, 800, 1000];
const TEAM_COLORS = ["#06b6d4", "#f43f5e", "#a3e635", "#f97316"];
const TEAM_BG = ["rgba(6,182,212,0.18)", "rgba(244,63,94,0.18)", "rgba(163,230,53,0.18)", "rgba(249,115,22,0.18)"];

/* ── Helpers ── */
function dollar(n) { return `$${n}`; }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── CSS injected once ── */
const styleEl = document.createElement("style");
styleEl.textContent = `
  @keyframes shimmer {
    0%   { background-position: -800px 0; }
    100% { background-position:  800px 0; }
  }
  @keyframes cellPulse {
    0%,100% { box-shadow: inset 0 0 0px rgba(255,200,0,0); }
    50%      { box-shadow: inset 0 0 24px rgba(255,200,0,0.15); }
  }
  @keyframes boardIn {
    from { opacity:0; transform: scale(0.97); }
    to   { opacity:1; transform: scale(1); }
  }
  @keyframes qSlide {
    from { opacity:0; transform: translateY(30px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes ddPulse {
    0%,100% { text-shadow: 0 0 20px #ffd700, 0 0 40px #ffd700; }
    50%     { text-shadow: 0 0 60px #ffd700, 0 0 100px #ffaa00; }
  }
  @keyframes answerReveal {
    from { opacity:0; transform: scaleY(0.6); }
    to   { opacity:1; transform: scaleY(1); }
  }
  @keyframes winnerGlow {
    0%,100% { text-shadow: 0 0 30px #ffd700, 0 0 60px #ffd700; }
    50%     { text-shadow: 0 0 80px #ffd700, 0 0 140px #ffaa00; }
  }
  .cell-hover:hover {
    filter: brightness(1.18) !important;
    transform: scale(1.03) !important;
    z-index: 2;
    cursor: pointer;
  }
  .reveal-hover:hover { filter: brightness(1.15); transform: scale(1.02); }
  .award-hover:hover  { filter: brightness(1.2);  transform: scale(1.04); }
  * { box-sizing: border-box; }
`;
document.head.appendChild(styleEl);

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function BibleJeopardy() {
  const [teams, setTeams]               = useState([{ name: "Team 1", score: 0 }, { name: "Team 2", score: 0 }]);
  const [numTeams, setNumTeams]         = useState(2);
  const [selected, setSelected]         = useState(null);
  const [revealed, setRevealed]         = useState(false);
  const [used, setUsed]                 = useState({});
  const [screen, setScreen]             = useState("setup");
  const [winner, setWinner]             = useState(null);
  const [dailyDouble, setDailyDouble]   = useState(null);
  const [ddPhase, setDdPhase]           = useState(false);
  const [gameCategories, setGameCategories] = useState([]);
  const [gameQuestions, setGameQuestions]   = useState({});

  const buildGame = () => {
    const cats = shuffle(ALL_CATEGORIES).slice(0, 6);
    const questions = {};
    for (const cat of cats) {
      questions[cat] = {};
      for (const pts of POINT_VALUES) {
        const pool = QUESTION_BANK[cat][pts];
        questions[cat][pts] = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    return { cats, questions };
  };

  const startGame = () => {
    const { cats, questions } = buildGame();
    setGameCategories(cats);
    setGameQuestions(questions);
    const ddCat = cats[Math.floor(Math.random() * cats.length)];
    const ddPts = POINT_VALUES[2 + Math.floor(Math.random() * 3)]; // 600–1000
    setDailyDouble(`${ddCat}-${ddPts}`);
    setScreen("board");
  };

  const selectQuestion = (cat, pts) => {
    const key = `${cat}-${pts}`;
    if (used[key]) return;
    sounds.cellSelect();
    setSelected({ cat, pts, key });
    setRevealed(false);
    setDdPhase(key === dailyDouble);
    setScreen("question");
  };

  const awardPoints = (teamIdx, pts) => {
    sounds.correct();
    setTeams(teams.map((t, i) => i === teamIdx ? { ...t, score: t.score + pts } : t));
    closeQuestion();
  };

  const deductPoints = (teamIdx, pts) => {
    sounds.wrong();
    setTeams(teams.map((t, i) => i === teamIdx ? { ...t, score: Math.max(0, t.score - pts) } : t));
  };

  const closeQuestion = () => {
    const newUsed = { ...used, [selected.key]: true };
    setUsed(newUsed);
    setSelected(null); setRevealed(false); setDdPhase(false);
    setScreen("board");
    if (Object.keys(newUsed).length === gameCategories.length * POINT_VALUES.length) {
      const max = Math.max(...teams.map(t => t.score));
      setWinner(teams.filter(t => t.score === max));
    }
  };

  const resetGame = () => {
    setUsed({}); setSelected(null); setRevealed(false);
    setWinner(null); setDdPhase(false); setScreen("setup");
    setGameCategories([]); setGameQuestions({});
    setTeams(teams.map(t => ({ ...t, score: 0 })));
  };

  const isDailyDouble = selected && selected.key === dailyDouble;

  /* ── SETUP ── */
  if (screen === "setup") return <SetupScreen teams={teams} setTeams={setTeams} numTeams={numTeams} setNumTeams={setNumTeams} onStart={startGame} />;

  /* ── WINNER ── */
  if (winner) return <WinnerScreen winner={winner} teams={teams} onReset={resetGame} />;

  /* ── QUESTION ── */
  if (screen === "question" && selected) {
    const q = gameQuestions[selected.cat][selected.pts];
    return (
      <QuestionScreen
        q={q} selected={selected} isDailyDouble={isDailyDouble}
        ddPhase={ddPhase} setDdPhase={setDdPhase}
        revealed={revealed} setRevealed={setRevealed}
        teams={teams} onAward={awardPoints} onDeduct={deductPoints}
        onClose={closeQuestion}
      />
    );
  }

  /* ── BOARD ── */
  return <BoardScreen categories={gameCategories} teams={teams} used={used} onSelect={selectQuestion} onReset={resetGame} />;
}

/* ══════════════════════════════════════════
   SETUP SCREEN
══════════════════════════════════════════ */
function SetupScreen({ teams, setTeams, numTeams, setNumTeams, onStart }) {
  return (
    <div style={{ width:"100vw", height:"100vh", background:"#060b2e", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Oswald', sans-serif" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, #0d1f6e 0%, #060b2e 70%)", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:32, width:680 }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:18, color:"#7ec8e3", letterSpacing:8, marginBottom:8, fontWeight:400 }}>REKINDLE STUDENTS PRESENTS</div>
          <div style={{ fontSize:96, fontWeight:700, color:"#ffd700", letterSpacing:6, lineHeight:1, textShadow:"0 0 40px rgba(255,215,0,0.5), 0 4px 0 #b8860b" }}>BIBLE</div>
          <div style={{ fontSize:96, fontWeight:700, color:"#ffd700", letterSpacing:6, lineHeight:1, textShadow:"0 0 40px rgba(255,215,0,0.5), 0 4px 0 #b8860b" }}>JEOPARDY</div>
          <div style={{ width:"100%", height:4, background:"linear-gradient(90deg, transparent, #ffd700, transparent)", margin:"16px 0" }} />
        </div>

        <div style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"36px 40px", display:"flex", flexDirection:"column", gap:24 }}>
          <div>
            <div style={{ color:"#7ec8e3", fontSize:14, letterSpacing:4, marginBottom:14 }}>NUMBER OF TEAMS</div>
            <div style={{ display:"flex", gap:12 }}>
              {[2,3,4].map(n => (
                <button key={n} onClick={() => { setNumTeams(n); setTeams(Array.from({length:n},(_,i)=>({name:`Team ${i+1}`,score:0}))); }}
                  style={{ flex:1, height:64, borderRadius:10, border: numTeams===n ? "3px solid #ffd700" : "2px solid rgba(255,255,255,0.2)", background: numTeams===n ? "rgba(255,215,0,0.15)" : "transparent", color: numTeams===n ? "#ffd700" : "rgba(255,255,255,0.5)", fontSize:28, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.2s" }}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ color:"#7ec8e3", fontSize:14, letterSpacing:4, marginBottom:14 }}>TEAM NAMES</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {teams.slice(0,numTeams).map((t,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:14, height:14, borderRadius:3, background:TEAM_COLORS[i], flexShrink:0 }} />
                  <input value={t.name}
                    onChange={e => { const u=[...teams]; u[i]={...u[i],name:e.target.value}; setTeams(u); }}
                    style={{ flex:1, padding:"14px 18px", borderRadius:10, border:`2px solid ${TEAM_COLORS[i]}44`, background:"rgba(255,255,255,0.06)", color:"white", fontSize:20, fontFamily:"'Oswald',sans-serif", outline:"none", letterSpacing:1 }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button onClick={onStart}
            style={{ marginTop:8, padding:"22px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:12, fontSize:26, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", transition:"all 0.2s" }}>
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   BOARD SCREEN
══════════════════════════════════════════ */
function BoardScreen({ categories, teams, used, onSelect, onReset }) {
  const ROWS = POINT_VALUES.length;
  const COLS = categories.length;

  return (
    <div style={{ width:"100vw", height:"100vh", background:"#060b2e", display:"flex", flexDirection:"column", overflow:"hidden", fontFamily:"'Oswald',sans-serif" }}>

      <div style={{ display:"flex", alignItems:"center", padding:"0 40px", height:110, flexShrink:0, borderBottom:"3px solid #ffd70033", background:"linear-gradient(180deg,#0a1245,#060b2e)" }}>
        <div style={{ flex:"0 0 auto", marginRight:40 }}>
          <span style={{ fontSize:52, fontWeight:700, color:"#ffd700", letterSpacing:5, textShadow:"0 0 24px rgba(255,215,0,0.4)" }}>BIBLE JEOPARDY</span>
          <span style={{ fontSize:15, color:"rgba(255,255,255,0.35)", letterSpacing:4, marginLeft:20 }}>REKINDLE STUDENTS</span>
        </div>
        <div style={{ flex:1 }} />
        {teams.map((t,i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", marginLeft:24, padding:"8px 28px", borderRadius:12, border:`2px solid ${TEAM_COLORS[i]}`, background:TEAM_BG[i] }}>
            <span style={{ fontSize:13, color:TEAM_COLORS[i], letterSpacing:3 }}>{t.name.toUpperCase()}</span>
            <span style={{ fontSize:40, fontWeight:700, color:"white", lineHeight:1.1, fontVariantNumeric:"tabular-nums" }}>{dollar(t.score)}</span>
          </div>
        ))}
        <button onClick={onReset} style={{ marginLeft:32, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.4)", borderRadius:8, padding:"10px 18px", cursor:"pointer", fontSize:22, fontFamily:"'Oswald',sans-serif" }}>↺</button>
      </div>

      <div style={{ flex:1, display:"grid", gridTemplateColumns:`repeat(${COLS},1fr)`, gridTemplateRows:`auto repeat(${ROWS},1fr)`, gap:6, padding:"6px 6px 8px", animation:"boardIn 0.4s ease" }}>

        {categories.map(cat => (
          <div key={cat} style={{ background:"linear-gradient(180deg,#0d2080,#091660)", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:6, padding:"0 12px", minHeight:90, border:"2px solid #1a2f9a" }}>
            <span style={{ color:"#7ec8e3", fontSize:22, fontWeight:600, textAlign:"center", lineHeight:1.2, letterSpacing:2, textTransform:"uppercase" }}>{cat}</span>
          </div>
        ))}

        {POINT_VALUES.map(pts =>
          categories.map(cat => {
            const key = `${cat}-${pts}`;
            const isUsed = used[key];
            return (
              <div key={key}
                className={isUsed ? "" : "cell-hover"}
                onClick={() => !isUsed && onSelect(cat, pts)}
                style={{
                  background: isUsed ? "#07103a" : "linear-gradient(180deg,#0e2191 0%,#091660 100%)",
                  border: isUsed ? "2px solid #0d1850" : "2px solid #1a3aab",
                  borderRadius:6,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  transition:"all 0.15s",
                  animation: isUsed ? "none" : "cellPulse 4s infinite",
                }}>
                {!isUsed && (
                  <span style={{ fontSize:54, fontWeight:700, color:"#ffd700", textShadow:"0 2px 12px rgba(255,200,0,0.5)", fontVariantNumeric:"tabular-nums" }}>
                    {dollar(pts)}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   QUESTION SCREEN
══════════════════════════════════════════ */
function QuestionScreen({ q, selected, isDailyDouble, ddPhase, setDdPhase, revealed, setRevealed, teams, onAward, onDeduct, onClose }) {
  useEffect(() => {
    if (isDailyDouble && ddPhase) sounds.dailyDouble();
  }, [isDailyDouble, ddPhase]);

  return (
    <div style={{ width:"100vw", height:"100vh", background:"#060b2e", display:"flex", flexDirection:"column", fontFamily:"'Oswald',sans-serif", overflow:"hidden" }}>

      <div style={{ height:80, background:"linear-gradient(180deg,#0a1245,#060b2e)", borderBottom:"3px solid #ffd70033", display:"flex", alignItems:"center", padding:"0 60px", flexShrink:0, gap:24 }}>
        <span style={{ fontSize:22, color:"#7ec8e3", letterSpacing:4 }}>{selected.cat.toUpperCase()}</span>
        <span style={{ fontSize:22, color:"rgba(255,255,255,0.25)" }}>|</span>
        <span style={{ fontSize:22, color:"#ffd700", letterSpacing:3 }}>{isDailyDouble ? "DAILY DOUBLE" : dollar(selected.pts)}</span>
        <div style={{ flex:1 }} />
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.45)", borderRadius:8, padding:"10px 24px", cursor:"pointer", fontSize:16, letterSpacing:3, fontFamily:"'Oswald',sans-serif" }}>
          ← BACK TO BOARD
        </button>
      </div>

      {isDailyDouble && ddPhase ? (
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:40 }}>
          <div style={{ fontSize:160, fontWeight:700, color:"#ffd700", letterSpacing:8, animation:"ddPulse 1.5s infinite", lineHeight:1 }}>DAILY</div>
          <div style={{ fontSize:160, fontWeight:700, color:"#ffd700", letterSpacing:8, animation:"ddPulse 1.5s infinite 0.3s", lineHeight:1 }}>DOUBLE</div>
          <div style={{ fontSize:22, color:"rgba(255,255,255,0.5)", letterSpacing:4, marginTop:20 }}>⭐ BONUS QUESTION ⭐</div>
          <button onClick={() => setDdPhase(false)} className="reveal-hover"
            style={{ marginTop:20, padding:"24px 80px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:28, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 30px rgba(255,215,0,0.5)", transition:"all 0.15s" }}>
            REVEAL QUESTION
          </button>
        </div>
      ) : (
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"40px 120px 32px", animation:"qSlide 0.35s ease" }}>

          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", width:"100%", maxWidth:1400, background:"linear-gradient(160deg,#0c1e8a,#070e52)", border:`3px solid ${isDailyDouble ? "#ffd700" : "#1a3aab"}`, borderRadius:20, padding:"60px 100px", boxShadow:"0 0 60px rgba(0,60,200,0.3)", marginBottom:32 }}>
            <p style={{ fontSize:52, color:"white", textAlign:"center", lineHeight:1.45, margin:0, fontWeight:400, letterSpacing:1, textTransform:"uppercase" }}>{q.q}</p>
          </div>

          {revealed && (
            <div style={{ width:"100%", maxWidth:1400, background:"rgba(255,215,0,0.08)", border:"3px solid #ffd700", borderRadius:16, padding:"28px 60px", marginBottom:32, textAlign:"center", animation:"answerReveal 0.3s ease", transformOrigin:"top" }}>
              <div style={{ fontSize:13, color:"#ffd700", letterSpacing:5, marginBottom:10 }}>ANSWER</div>
              <div style={{ fontSize:42, color:"white", fontWeight:600, letterSpacing:1 }}>{q.a}</div>
            </div>
          )}

          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:18, width:"100%", maxWidth:1400 }}>
            {!revealed ? (
              <button onClick={() => { sounds.revealAnswer(); setRevealed(true); }} className="reveal-hover"
                style={{ padding:"24px 120px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:26, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", transition:"all 0.15s" }}>
                REVEAL ANSWER
              </button>
            ) : (
              <>
                <div style={{ fontSize:14, color:"rgba(255,255,255,0.4)", letterSpacing:4, marginBottom:4 }}>AWARD POINTS TO</div>
                <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
                  {teams.map((t,i) => (
                    <button key={i} onClick={() => onAward(i, selected.pts)} className="award-hover"
                      style={{ padding:"20px 44px", background:TEAM_BG[i], border:`2px solid ${TEAM_COLORS[i]}`, borderRadius:12, color:TEAM_COLORS[i], fontSize:22, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s", minWidth:200 }}>
                      {t.name}
                      <span style={{ display:"block", fontSize:14, color:"rgba(255,255,255,0.5)", fontWeight:400, letterSpacing:2 }}>{dollar(t.score)}</span>
                    </button>
                  ))}
                </div>

                <div style={{ display:"flex", gap:24, marginTop:4 }}>
                  {teams.map((t,i) => (
                    <span key={i} onClick={() => onDeduct(i, selected.pts)}
                      style={{ fontSize:14, color:TEAM_COLORS[i], opacity:0.6, cursor:"pointer", letterSpacing:2, textDecoration:"underline" }}>
                      -{dollar(selected.pts)} {t.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   WINNER SCREEN
══════════════════════════════════════════ */
function WinnerScreen({ winner, teams, onReset }) {
  useEffect(() => { sounds.winner(); }, []);

  return (
    <div style={{ width:"100vw", height:"100vh", background:"#060b2e", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Oswald',sans-serif", gap:48 }}>
      <div style={{ fontSize:200, lineHeight:1 }}>🏆</div>
      <div style={{ fontSize:winner.length>1 ? 80 : 96, fontWeight:700, color:"#ffd700", letterSpacing:6, animation:"winnerGlow 2s infinite", textAlign:"center" }}>
        {winner.length > 1 ? "IT'S A TIE!" : `${winner[0].name.toUpperCase()} WINS!`}
      </div>

      <div style={{ display:"flex", gap:24, marginTop:8 }}>
        {teams.map((t,i) => (
          <div key={i} style={{ padding:"20px 48px", background:TEAM_BG[i], border:`3px solid ${TEAM_COLORS[i]}`, borderRadius:14, textAlign:"center", minWidth:220 }}>
            <div style={{ fontSize:18, color:TEAM_COLORS[i], letterSpacing:3 }}>{t.name.toUpperCase()}</div>
            <div style={{ fontSize:56, fontWeight:700, color:"white" }}>{dollar(t.score)}</div>
          </div>
        ))}
      </div>

      <button onClick={onReset} style={{ padding:"22px 80px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:26, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", marginTop:8 }}>
        PLAY AGAIN
      </button>
    </div>
  );
}
