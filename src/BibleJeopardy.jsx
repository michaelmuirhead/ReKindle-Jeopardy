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
  "Name That Verse": {
    200: [
      { q: "\"For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.\"", a: "John 3:16" },
      { q: "\"The Lord is my shepherd; I shall not want.\"", a: "Psalm 23:1" },
      { q: "\"I can do all things through Christ who strengthens me.\"", a: "Philippians 4:13" },
      { q: "\"Be still, and know that I am God.\"", a: "Psalm 46:10" },
      { q: "\"Jesus wept.\"", a: "John 11:35" },
      { q: "\"In the beginning, God created the heavens and the earth.\"", a: "Genesis 1:1" },
    ],
    400: [
      { q: "\"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.\"", a: "Proverbs 3:5-6" },
      { q: "\"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you a hope and a future.\"", a: "Jeremiah 29:11" },
      { q: "\"And we know that all things work together for good to those who love God, to those who are called according to His purpose.\"", a: "Romans 8:28" },
      { q: "\"Love is patient, love is kind. It does not envy, it does not boast, it is not proud.\"", a: "1 Corinthians 13:4" },
      { q: "\"Your word is a lamp to my feet and a light to my path.\"", a: "Psalm 119:105" },
      { q: "\"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.\"", a: "Matthew 7:7" },
    ],
    600: [
      { q: "\"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.\"", a: "Joshua 1:9" },
      { q: "\"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.\"", a: "Isaiah 40:31" },
      { q: "\"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.\"", a: "Philippians 4:6" },
      { q: "\"Come to me, all you who are weary and burdened, and I will give you rest.\"", a: "Matthew 11:28" },
      { q: "\"Delight yourself in the Lord, and He will give you the desires of your heart.\"", a: "Psalm 37:4" },
      { q: "\"This is the day the Lord has made; let us rejoice and be glad in it.\"", a: "Psalm 118:24" },
    ],
    800: [
      { q: "\"For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.\"", a: "Romans 6:23" },
      { q: "\"If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven and will heal their land.\"", a: "2 Chronicles 7:14" },
      { q: "\"Submit yourselves therefore to God. Resist the devil, and he will flee from you.\"", a: "James 4:7" },
      { q: "\"Do not conform to the pattern of this world, but be transformed by the renewing of your mind.\"", a: "Romans 12:2" },
      { q: "\"Greater love has no one than this: to lay down one's life for one's friends.\"", a: "John 15:13" },
      { q: "\"Cast all your anxiety on him because he cares for you.\"", a: "1 Peter 5:7" },
    ],
    1000: [
      { q: "\"For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.\"", a: "Ephesians 2:8-9" },
      { q: "\"No weapon forged against you will prevail, and you will refute every tongue that accuses you. This is the heritage of the servants of the Lord.\"", a: "Isaiah 54:17" },
      { q: "\"Now faith is confidence in what we hope for and assurance about what we do not see.\"", a: "Hebrews 11:1" },
      { q: "\"The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.\"", a: "John 10:10" },
      { q: "\"I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.\"", a: "Galatians 2:20" },
      { q: "\"Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.\"", a: "1 Thessalonians 5:16-18" },
    ],
  },
};

/* ── Final Jeopardy Question Pool ── */
const FINAL_JEOPARDY_QUESTIONS = [
  { category: "Books of the Bible",      q: "This is the only book of the Bible that never once mentions the name of God. It tells the story of how the Jewish people were saved from genocide through their queen's courageous act of faith.", a: "The Book of Esther" },
  { category: "Revelation",              q: "The Apostle John received his visions of the end times while exiled on a small island in the Aegean Sea. Name that island, and the verse where John tells us where he was.", a: "Patmos (Revelation 1:9)" },
  { category: "Bible Firsts",            q: "God referred to this man as a 'prophet' in Genesis 20:7 — the first time that specific title appears anywhere in the entire Bible. Who was he?", a: "Abraham (Genesis 20:7)" },
  { category: "The Road to Emmaus",      q: "On Resurrection Sunday, two disciples walked to the village of Emmaus with a stranger they didn't recognize. According to Luke 24, what happened the instant they recognized that the stranger was Jesus?", a: "He vanished — disappeared from their sight (Luke 24:31)" },
  { category: "The Ten Commandments",    q: "The Ten Commandments appear twice in the Bible — once in Exodus 20 and once in another book of Moses. Name that second book and the chapter.", a: "Deuteronomy 5" },
  { category: "Before Pentecost",        q: "According to Acts 1:15, approximately how many disciples were gathered together in Jerusalem between the Ascension of Jesus and the Day of Pentecost?", a: "About 120 people (Acts 1:15)" },
  { category: "Words from the Cross",    q: "Jesus spoke seven statements from the cross. In one of them, He entrusted His mother's care to a beloved disciple. What did He say to that disciple, and who was the disciple?", a: "\"Behold your mother\" — the Apostle John (John 19:27)" },
  { category: "Isaiah 53",               q: "Isaiah 53:9 contains a prophecy fulfilled at the crucifixion concerning two contrasting aspects of Jesus' death and burial. What does it say?", a: "He was assigned a grave with the wicked (crucified between criminals), yet with a rich man in His death (buried in Joseph of Arimathea's tomb)" },
  { category: "The Gospel of John",      q: "The Gospel of John contains seven 'I AM' statements of Jesus. Name at least four of them.", a: "Bread of life; Light of the world; the Door/Gate; the Good Shepherd; the Resurrection and the Life; the Way, the Truth and the Life; the True Vine" },
  { category: "The Early Church",        q: "After the stoning of Stephen, the church was scattered by persecution. One of the seven original deacons went to Samaria and later explained Isaiah 53 to a royal official from Africa riding in a chariot. Who was this deacon?", a: "Philip (Acts 8)" },
];

const ALL_CATEGORIES = Object.keys(QUESTION_BANK);
const POINT_VALUES = [200, 400, 600, 800, 1000];
const TEAM_COLORS = ["#06b6d4", "#f43f5e", "#a3e635", "#f97316"];
const TEAM_BG = ["rgba(6,182,212,0.18)", "rgba(244,63,94,0.18)", "rgba(163,230,53,0.18)", "rgba(249,115,22,0.18)"];

/* ── Distractor pools (one per category) ── */
const DISTRACTOR_POOLS = {
  "Characters": [
    "Moses","Abraham","David","Solomon","Elijah","Jonah","Joseph","Samson",
    "Daniel","Noah","Isaiah","Nehemiah","Jacob","Paul","Peter","Joshua",
    "Gideon","Caleb","King Saul","Ezekiel","John the Baptist","Jeremiah",
  ],
  "Life of Jesus": [
    "Bethlehem","Nazareth","Jerusalem","Jericho","Capernaum",
    "40 days","3 days","7 days","12 years","30 years",
    "Peter","James","John","Andrew","Mary","Galilee","Matthew","Luke",
  ],
  "Miracles": [
    "5 loaves and 2 fish","Lazarus","The Red Sea","Naaman","Jericho",
    "Manna","Peter","Elijah","Elisha","The Jordan River",
    "Uzzah","Moses","Cana","Bethesda","The Sea of Galilee",
  ],
  "Women of the Bible": [
    "Ruth","Rahab","Mary","Mary Magdalene","Miriam","Sarah",
    "Esther","Deborah","Delilah","Lydia","Priscilla","Anna",
    "Naomi","Bathsheba","Hannah","Abigail","Elizabeth","Leah","Rachel",
  ],
  "Numbers & Facts": [
    "3","7","10","12","30","40","50","66","120","150",
    "3 days","7 days","40 days","40 years","3 years",
    "500 people","969 years","153 fish","144,000","12 tribes",
  ],
  "The Early Church": [
    "Jerusalem","Antioch","Corinth","Ephesus","Rome","Philippi",
    "Peter","Paul","Barnabas","Stephen","Philip","Ananias",
    "Cornelius","Rhoda","Silas","Timothy","Apollos","Malta","Pentecost",
  ],
  "Prophets": [
    "Elijah","Elisha","Isaiah","Jeremiah","Ezekiel","Daniel",
    "Hosea","Micah","Jonah","Amos","Zechariah","Malachi",
    "Nahum","Habakkuk","Joel","Obadiah","Haggai","Zephaniah",
  ],
  "Psalms & Proverbs": [
    "Psalm 1","Psalm 22","Psalm 23","Psalm 27","Psalm 46","Psalm 51",
    "Psalm 91","Psalm 100","Psalm 119","Psalm 139",
    "Proverbs 3:5-6","Proverbs 4:23","Proverbs 16:18","Proverbs 22:6","Proverbs 31",
    "Solomon","David","Asaph","176 verses","73 Psalms",
  ],
  "Creation & Genesis": [
    "Adam","Eve","Noah","Abraham","Isaac","Jacob","Joseph",
    "Cain","Abel","Lot","Haran","Canaan",
    "Garden of Eden","Mount Ararat","Day 1","Day 3","Day 6",
    "Rainbow","50 chapters","Sodom","Gomorrah",
  ],
  "Kings & Kingdoms": [
    "King Saul","David","Solomon","Rehoboam","Ahab","Jehoshaphat",
    "Hezekiah","Josiah","Manasseh","Nebuchadnezzar","Asa",
    "Israel","Judah","Babylon","Assyria","Nathan","Elijah",
    "Three kings","Sixty years","Forty years",
  ],
  "Paul's Letters": [
    "Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians",
    "Philippians","Colossians","1 Thessalonians","1 Timothy","2 Timothy",
    "Titus","Philemon","Hebrews",
    "Corinth","Ephesus","Rome","Antioch","Thessalonica",
    "Habakkuk","Isaiah","Abraham","Moses",
  ],
  "Name That Verse": [
    "John 3:16","Psalm 23:1","Romans 8:28","Jeremiah 29:11",
    "Philippians 4:13","Proverbs 3:5-6","Isaiah 40:31","Matthew 7:7",
    "Hebrews 11:1","Galatians 2:20","Romans 6:23","Joshua 1:9",
    "1 Peter 5:7","Romans 12:2","James 4:7","Ephesians 2:8-9",
    "Psalm 46:10","Genesis 1:1","John 11:35","1 Corinthians 13:4",
    "Psalm 119:105","Matthew 11:28","Psalm 37:4","Psalm 118:24",
    "2 Chronicles 7:14","John 15:13","John 10:10","1 Thessalonians 5:16-18",
    "Isaiah 54:17","John 14:6","Acts 2:38","Matthew 5:8",
  ],
};

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

function generateChoices(correctAnswer, pool) {
  const ca = correctAnswer.toLowerCase().trim();
  // Exclude exact matches and items that start with the same word
  let candidates = pool.filter(item => {
    const p = item.toLowerCase().trim();
    return p !== ca && !p.startsWith(ca + " ") && !ca.startsWith(p + " ");
  });
  if (candidates.length < 3) {
    candidates = pool.filter(item => item.toLowerCase().trim() !== ca);
  }
  return shuffle([correctAnswer, ...shuffle(candidates).slice(0, 3)]).map((text, i) => ({
    label: ["A", "B", "C", "D"][i],
    text,
    correct: text === correctAnswer,
  }));
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
  const [gameCategories, setGameCategories]   = useState([]);
  const [gameQuestions, setGameQuestions]     = useState({});
  const [showFinalJeopardy, setShowFinalJeopardy] = useState(false);
  const [fjQuestion, setFjQuestion]           = useState(null);
  const [multiChoice, setMultiChoice]         = useState(false);

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
    const updatedTeams = teams.map((t, i) => i === teamIdx ? { ...t, score: t.score + pts } : t);
    setTeams(updatedTeams);
    closeQuestion(updatedTeams);
  };

  const deductPoints = (teamIdx, pts) => {
    sounds.wrong();
    setTeams(teams.map((t, i) => i === teamIdx ? { ...t, score: Math.max(0, t.score - pts) } : t));
  };

  const closeQuestion = (currentTeams = teams) => {
    const newUsed = { ...used, [selected.key]: true };
    setUsed(newUsed);
    setSelected(null); setRevealed(false); setDdPhase(false);
    setScreen("board");
    if (Object.keys(newUsed).length === gameCategories.length * POINT_VALUES.length) {
      const fj = FINAL_JEOPARDY_QUESTIONS[Math.floor(Math.random() * FINAL_JEOPARDY_QUESTIONS.length)];
      setFjQuestion(fj);
      setShowFinalJeopardy(true);
    }
  };

  const resetGame = () => {
    setUsed({}); setSelected(null); setRevealed(false);
    setWinner(null); setDdPhase(false); setScreen("setup");
    setGameCategories([]); setGameQuestions({});
    setShowFinalJeopardy(false); setFjQuestion(null);
    setTeams(teams.map(t => ({ ...t, score: 0 })));
  };

  const isDailyDouble = selected && selected.key === dailyDouble;

  /* ── SETUP ── */
  if (screen === "setup") return <SetupScreen teams={teams} setTeams={setTeams} numTeams={numTeams} setNumTeams={setNumTeams} multiChoice={multiChoice} setMultiChoice={setMultiChoice} onStart={startGame} />;

  /* ── WINNER ── */
  if (winner) return <WinnerScreen winner={winner} teams={teams} onReset={resetGame} />;

  /* ── FINAL JEOPARDY ── */
  if (showFinalJeopardy && fjQuestion) return (
    <FinalJeopardyScreen
      question={fjQuestion}
      teams={teams}
      onComplete={(updatedTeams) => {
        setTeams(updatedTeams);
        const max = Math.max(...updatedTeams.map(t => t.score));
        setWinner(updatedTeams.filter(t => t.score === max));
        setShowFinalJeopardy(false);
      }}
    />
  );

  /* ── QUESTION ── */
  if (screen === "question" && selected) {
    const q = gameQuestions[selected.cat][selected.pts];
    return (
      <QuestionScreen
        q={q} selected={selected} isDailyDouble={isDailyDouble}
        ddPhase={ddPhase} setDdPhase={setDdPhase}
        revealed={revealed} setRevealed={setRevealed}
        teams={teams} onAward={awardPoints} onDeduct={deductPoints}
        onClose={closeQuestion} multiChoice={multiChoice}
      />
    );
  }

  /* ── BOARD ── */
  return <BoardScreen categories={gameCategories} teams={teams} used={used} onSelect={selectQuestion} onReset={resetGame} />;
}

/* ══════════════════════════════════════════
   SETUP SCREEN
══════════════════════════════════════════ */
function SetupScreen({ teams, setTeams, numTeams, setNumTeams, multiChoice, setMultiChoice, onStart }) {
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

          <div>
            <div style={{ color:"#7ec8e3", fontSize:14, letterSpacing:4, marginBottom:14 }}>ANSWER FORMAT</div>
            <div style={{ display:"flex", gap:12 }}>
              {["OPEN ANSWER", "MULTIPLE CHOICE"].map((label, idx) => {
                const active = multiChoice === (idx === 1);
                return (
                  <button key={idx} onClick={() => setMultiChoice(idx === 1)}
                    style={{ flex:1, height:56, borderRadius:10, border: active ? "3px solid #ffd700" : "2px solid rgba(255,255,255,0.2)", background: active ? "rgba(255,215,0,0.15)" : "transparent", color: active ? "#ffd700" : "rgba(255,255,255,0.5)", fontSize:17, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:2, transition:"all 0.2s" }}>
                    {label}
                  </button>
                );
              })}
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
function QuestionScreen({ q, selected, isDailyDouble, ddPhase, setDdPhase, revealed, setRevealed, teams, onAward, onDeduct, onClose, multiChoice }) {
  const [ddTeamIdx, setDdTeamIdx]   = useState(null);
  const [ddWager, setDdWager]       = useState(null);
  const [wagerInput, setWagerInput] = useState("");
  const [wagerError, setWagerError] = useState("");

  // Generate choices once on mount (stable for this question's lifetime)
  const [choices] = useState(() => {
    if (!multiChoice) return null;
    const pool = DISTRACTOR_POOLS[selected.cat] || [];
    return generateChoices(q.a, pool);
  });

  useEffect(() => {
    if (isDailyDouble && ddPhase) sounds.dailyDouble();
  }, [isDailyDouble, ddPhase]);

  const maxWager = ddTeamIdx !== null
    ? Math.max(teams[ddTeamIdx].score, 1000)
    : 1000;

  const lockInWager = () => {
    const w = parseInt(wagerInput, 10);
    if (isNaN(w) || w < 5)           { setWagerError(`Minimum wager is $5`); return; }
    if (w > maxWager)                 { setWagerError(`Maximum wager is ${dollar(maxWager)}`); return; }
    setWagerError("");
    setDdWager(w);
  };

  // Points used for award/deduct: wager on DD, face value otherwise
  const effectivePts = isDailyDouble && ddWager !== null ? ddWager : selected.pts;

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
        /* ── Daily Double card with wagering sub-phases ── */
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24, padding:"0 80px" }}>

          {/* Big pulsing title */}
          <div style={{ fontSize:130, fontWeight:700, color:"#ffd700", letterSpacing:8, animation:"ddPulse 1.5s infinite", lineHeight:1 }}>DAILY</div>
          <div style={{ fontSize:130, fontWeight:700, color:"#ffd700", letterSpacing:8, animation:"ddPulse 1.5s infinite 0.3s", lineHeight:1, marginBottom:8 }}>DOUBLE</div>

          {/* Sub-phase 1: pick which team found it */}
          {ddTeamIdx === null && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
              <div style={{ fontSize:18, color:"rgba(255,255,255,0.55)", letterSpacing:5 }}>WHICH TEAM FOUND IT?</div>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
                {teams.map((t, i) => (
                  <button key={i} onClick={() => setDdTeamIdx(i)} className="award-hover"
                    style={{ padding:"18px 40px", background:TEAM_BG[i], border:`2px solid ${TEAM_COLORS[i]}`, borderRadius:12, color:TEAM_COLORS[i], fontSize:22, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s", minWidth:180 }}>
                    {t.name}
                    <span style={{ display:"block", fontSize:13, color:"rgba(255,255,255,0.45)", fontWeight:400, letterSpacing:2 }}>{dollar(t.score)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sub-phase 2: enter wager */}
          {ddTeamIdx !== null && ddWager === null && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
              <div style={{ fontSize:18, color:TEAM_COLORS[ddTeamIdx], letterSpacing:5 }}>
                {teams[ddTeamIdx].name.toUpperCase()} — ENTER YOUR WAGER
              </div>
              <div style={{ fontSize:14, color:"rgba(255,255,255,0.35)", letterSpacing:3 }}>
                CURRENT SCORE: {dollar(teams[ddTeamIdx].score)} &nbsp;|&nbsp; MAX WAGER: {dollar(maxWager)}
              </div>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <span style={{ fontSize:32, color:"#ffd700", fontWeight:700 }}>$</span>
                <input
                  autoFocus
                  type="number" min="5" max={maxWager}
                  value={wagerInput}
                  onChange={e => { setWagerInput(e.target.value); setWagerError(""); }}
                  onKeyDown={e => e.key === "Enter" && lockInWager()}
                  style={{ width:220, padding:"16px 20px", borderRadius:10, border:`2px solid ${TEAM_COLORS[ddTeamIdx]}`, background:"rgba(255,255,255,0.07)", color:"white", fontSize:32, fontFamily:"'Oswald',sans-serif", outline:"none", textAlign:"center", fontVariantNumeric:"tabular-nums" }}
                />
              </div>
              {wagerError && (
                <div style={{ fontSize:14, color:"#f43f5e", letterSpacing:2 }}>{wagerError}</div>
              )}
              <button onClick={lockInWager} className="reveal-hover"
                style={{ marginTop:4, padding:"18px 60px", background:`linear-gradient(180deg,${TEAM_COLORS[ddTeamIdx]},${TEAM_COLORS[ddTeamIdx]}aa)`, color:"#060b2e", border:"none", borderRadius:12, fontSize:22, fontWeight:700, letterSpacing:4, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s" }}>
                LOCK IN WAGER
              </button>
            </div>
          )}

          {/* Sub-phase 3: wager locked — ready to reveal */}
          {ddWager !== null && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
              <div style={{ fontSize:18, color:"rgba(255,255,255,0.55)", letterSpacing:4 }}>
                {teams[ddTeamIdx].name.toUpperCase()} IS WAGERING
              </div>
              <div style={{ fontSize:72, fontWeight:700, color:"#ffd700", textShadow:"0 0 30px rgba(255,215,0,0.5)" }}>
                {dollar(ddWager)}
              </div>
              <button onClick={() => setDdPhase(false)} className="reveal-hover"
                style={{ marginTop:8, padding:"22px 80px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:26, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 30px rgba(255,215,0,0.5)", transition:"all 0.15s" }}>
                REVEAL QUESTION
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ── Question + controls ── */
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding: multiChoice ? "20px 80px 20px" : "40px 120px 32px", animation:"qSlide 0.35s ease" }}>

          {/* Question card */}
          <div style={{ flex: multiChoice ? "0 0 auto" : 1, display:"flex", alignItems:"center", justifyContent:"center", width:"100%", maxWidth:1400, background:"linear-gradient(160deg,#0c1e8a,#070e52)", border:`3px solid ${isDailyDouble ? "#ffd700" : "#1a3aab"}`, borderRadius:20, padding: multiChoice ? "28px 60px" : "60px 100px", boxShadow:"0 0 60px rgba(0,60,200,0.3)", marginBottom:16 }}>
            <p style={{ fontSize: multiChoice ? 38 : 52, color:"white", textAlign:"center", lineHeight:1.4, margin:0, fontWeight:400, letterSpacing:1, textTransform:"uppercase" }}>{q.q}</p>
          </div>

          {/* Multiple-choice grid */}
          {multiChoice && choices && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, width:"100%", maxWidth:1400, marginBottom:16 }}>
              {choices.map(choice => {
                const correct = revealed && choice.correct;
                const wrong   = revealed && !choice.correct;
                return (
                  <div key={choice.label} style={{
                    background: correct ? "linear-gradient(160deg,rgba(255,215,0,0.22),rgba(255,215,0,0.08))"
                              : wrong   ? "rgba(255,255,255,0.02)"
                                        : "linear-gradient(160deg,#0e2191,#091660)",
                    border: correct ? "2px solid #ffd700"
                          : wrong   ? "2px solid rgba(255,255,255,0.07)"
                                    : "2px solid #1a3aab",
                    borderRadius:14, padding:"16px 24px",
                    display:"flex", alignItems:"center", gap:18,
                    transition:"border 0.3s, background 0.3s",
                    boxShadow: correct ? "0 0 20px rgba(255,215,0,0.25)" : "none",
                  }}>
                    <span style={{ fontSize:30, fontWeight:700, flexShrink:0, minWidth:34,
                      color: correct ? "#ffd700" : wrong ? "rgba(255,255,255,0.18)" : "#ffd700" }}>
                      {choice.label}
                    </span>
                    <span style={{ fontSize:24, lineHeight:1.3,
                      color: correct ? "#ffd700" : wrong ? "rgba(255,255,255,0.18)" : "white",
                      fontWeight: correct ? 600 : 400 }}>
                      {choice.text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Standard answer box — open-answer mode only */}
          {!multiChoice && revealed && (
            <div style={{ width:"100%", maxWidth:1400, background:"rgba(255,215,0,0.08)", border:"3px solid #ffd700", borderRadius:16, padding:"28px 60px", marginBottom:32, textAlign:"center", animation:"answerReveal 0.3s ease", transformOrigin:"top" }}>
              <div style={{ fontSize:13, color:"#ffd700", letterSpacing:5, marginBottom:10 }}>ANSWER</div>
              <div style={{ fontSize:42, color:"white", fontWeight:600, letterSpacing:1 }}>{q.a}</div>
            </div>
          )}

          {/* Controls */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:18, width:"100%", maxWidth:1400 }}>
            {!revealed ? (
              <button onClick={() => { sounds.revealAnswer(); setRevealed(true); }} className="reveal-hover"
                style={{ padding:"24px 120px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:26, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", transition:"all 0.15s" }}>
                REVEAL ANSWER
              </button>
            ) : (
              <>
                {isDailyDouble ? (
                  /* DD: only the wagering team gets award/deduct */
                  <>
                    <div style={{ fontSize:14, color:"rgba(255,255,255,0.4)", letterSpacing:4, marginBottom:4 }}>
                      AWARD {dollar(effectivePts)} TO
                    </div>
                    <button onClick={() => onAward(ddTeamIdx, effectivePts)} className="award-hover"
                      style={{ padding:"20px 60px", background:TEAM_BG[ddTeamIdx], border:`2px solid ${TEAM_COLORS[ddTeamIdx]}`, borderRadius:12, color:TEAM_COLORS[ddTeamIdx], fontSize:26, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s", minWidth:280 }}>
                      {teams[ddTeamIdx].name}
                      <span style={{ display:"block", fontSize:14, color:"rgba(255,255,255,0.5)", fontWeight:400, letterSpacing:2 }}>{dollar(teams[ddTeamIdx].score)}</span>
                    </button>
                    <span onClick={() => onDeduct(ddTeamIdx, effectivePts)}
                      style={{ fontSize:14, color:TEAM_COLORS[ddTeamIdx], opacity:0.6, cursor:"pointer", letterSpacing:2, textDecoration:"underline", marginTop:4 }}>
                      -{dollar(effectivePts)} {teams[ddTeamIdx].name} (wrong answer)
                    </span>
                  </>
                ) : (
                  /* Normal: all teams */
                  <>
                    <div style={{ fontSize:14, color:"rgba(255,255,255,0.4)", letterSpacing:4, marginBottom:4 }}>AWARD POINTS TO</div>
                    <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
                      {teams.map((t,i) => (
                        <button key={i} onClick={() => onAward(i, effectivePts)} className="award-hover"
                          style={{ padding:"20px 44px", background:TEAM_BG[i], border:`2px solid ${TEAM_COLORS[i]}`, borderRadius:12, color:TEAM_COLORS[i], fontSize:22, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s", minWidth:200 }}>
                          {t.name}
                          <span style={{ display:"block", fontSize:14, color:"rgba(255,255,255,0.5)", fontWeight:400, letterSpacing:2 }}>{dollar(t.score)}</span>
                        </button>
                      ))}
                    </div>
                    <div style={{ display:"flex", gap:24, marginTop:4 }}>
                      {teams.map((t,i) => (
                        <span key={i} onClick={() => onDeduct(i, effectivePts)}
                          style={{ fontSize:14, color:TEAM_COLORS[i], opacity:0.6, cursor:"pointer", letterSpacing:2, textDecoration:"underline" }}>
                          -{dollar(effectivePts)} {t.name}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   FINAL JEOPARDY SCREEN
══════════════════════════════════════════ */
function FinalJeopardyScreen({ question, teams, onComplete }) {
  const [phase, setPhase]               = useState("category");
  const [wagerInputs, setWagerInputs]   = useState(teams.map(() => ""));
  const [wagerErrors, setWagerErrors]   = useState(teams.map(() => ""));
  const [wagers, setWagers]             = useState(null);
  const [judged, setJudged]             = useState(teams.map(() => null));
  const [finalScores, setFinalScores]   = useState(teams.map(t => t.score));

  useEffect(() => { sounds.finalReveal(); }, []);

  const lockWagers = () => {
    const errors = teams.map((t, i) => {
      const w = parseInt(wagerInputs[i], 10);
      if (isNaN(w) || w < 0) return "Minimum $0";
      if (w > t.score)       return `Maximum ${dollar(t.score)}`;
      return "";
    });
    if (errors.some(e => e)) { setWagerErrors(errors); return; }
    setWagers(teams.map((_, i) => parseInt(wagerInputs[i], 10)));
    setPhase("question");
  };

  const judgeTeam = (i, correct) => {
    sounds[correct ? "correct" : "wrong"]();
    const newJudged = [...judged];
    newJudged[i] = correct;
    setJudged(newJudged);
    setFinalScores(prev => {
      const next = [...prev];
      next[i] = Math.max(0, prev[i] + (correct ? wagers[i] : -wagers[i]));
      return next;
    });
  };

  const allJudged = judged.every(j => j !== null);

  const finish = () => {
    const updatedTeams = teams.map((t, i) => ({ ...t, score: finalScores[i] }));
    onComplete(updatedTeams);
  };

  return (
    <div style={{ width:"100vw", height:"100vh", background:"#060b2e", display:"flex", flexDirection:"column", fontFamily:"'Oswald',sans-serif", overflow:"hidden" }}>

      {/* Header */}
      <div style={{ height:80, background:"linear-gradient(180deg,#0a1245,#060b2e)", borderBottom:"3px solid #ffd70033", display:"flex", alignItems:"center", padding:"0 60px", flexShrink:0, gap:16 }}>
        <span style={{ fontSize:28, fontWeight:700, color:"#ffd700", letterSpacing:6, textShadow:"0 0 20px rgba(255,215,0,0.4)" }}>FINAL JEOPARDY</span>
        <div style={{ flex:1 }} />
        {teams.map((t, i) => (
          <div key={i} style={{ marginLeft:16, padding:"6px 22px", borderRadius:10, border:`2px solid ${TEAM_COLORS[i]}`, background:TEAM_BG[i], textAlign:"center" }}>
            <div style={{ fontSize:11, color:TEAM_COLORS[i], letterSpacing:3 }}>{t.name.toUpperCase()}</div>
            <div style={{ fontSize:26, fontWeight:700, color:"white", fontVariantNumeric:"tabular-nums" }}>
              {judged[i] !== null ? dollar(finalScores[i]) : dollar(t.score)}
            </div>
          </div>
        ))}
      </div>

      {/* ── Phase: category reveal ── */}
      {phase === "category" && (
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:20 }}>
          <div style={{ fontSize:120, fontWeight:700, color:"#ffd700", letterSpacing:8, lineHeight:1, animation:"ddPulse 2s infinite", textAlign:"center" }}>FINAL</div>
          <div style={{ fontSize:120, fontWeight:700, color:"#ffd700", letterSpacing:8, lineHeight:1, animation:"ddPulse 2s infinite 0.4s", textAlign:"center" }}>JEOPARDY</div>
          <div style={{ width:700, height:3, background:"linear-gradient(90deg, transparent, #ffd700, transparent)", margin:"12px 0" }} />
          <div style={{ fontSize:15, color:"rgba(255,255,255,0.4)", letterSpacing:6 }}>TONIGHT'S CATEGORY</div>
          <div style={{ fontSize:60, fontWeight:700, color:"white", letterSpacing:3, textAlign:"center", textTransform:"uppercase", maxWidth:900, lineHeight:1.2 }}>
            {question.category}
          </div>
          <button onClick={() => setPhase("wagering")} className="reveal-hover"
            style={{ marginTop:28, padding:"22px 80px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:24, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", transition:"all 0.15s" }}>
            BEGIN WAGERING
          </button>
        </div>
      )}

      {/* ── Phase: wager entry ── */}
      {phase === "wagering" && (
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28, padding:"0 60px" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:15, color:"rgba(255,255,255,0.4)", letterSpacing:5 }}>CATEGORY</div>
            <div style={{ fontSize:36, fontWeight:700, color:"white", letterSpacing:3, textTransform:"uppercase" }}>{question.category}</div>
          </div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.3)", letterSpacing:4 }}>ENTER EACH TEAM'S WAGER — MIN $0, MAX = CURRENT SCORE</div>

          <div style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center", width:"100%" }}>
            {teams.map((t, i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"26px 30px", background:"rgba(255,255,255,0.04)", border:`2px solid ${wagerErrors[i] ? "#f43f5e" : TEAM_COLORS[i] + "55"}`, borderRadius:16, minWidth:210 }}>
                <div style={{ fontSize:15, color:TEAM_COLORS[i], letterSpacing:3 }}>{t.name.toUpperCase()}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.35)", letterSpacing:2 }}>Score: {dollar(t.score)}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:22, color:"#ffd700", fontWeight:700 }}>$</span>
                  <input
                    type="number" min="0" max={t.score}
                    value={wagerInputs[i]}
                    onChange={e => {
                      const u = [...wagerInputs]; u[i] = e.target.value; setWagerInputs(u);
                      const ue = [...wagerErrors]; ue[i] = ""; setWagerErrors(ue);
                    }}
                    style={{ width:150, padding:"12px 14px", borderRadius:10, border:`2px solid ${wagerErrors[i] ? "#f43f5e" : TEAM_COLORS[i]}`, background:"rgba(255,255,255,0.07)", color:"white", fontSize:22, fontFamily:"'Oswald',sans-serif", outline:"none", textAlign:"center" }}
                  />
                </div>
                {wagerErrors[i] && <div style={{ fontSize:12, color:"#f43f5e", letterSpacing:1 }}>{wagerErrors[i]}</div>}
              </div>
            ))}
          </div>

          <button onClick={lockWagers} className="reveal-hover"
            style={{ padding:"20px 80px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:22, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s" }}>
            LOCK IN WAGERS
          </button>
        </div>
      )}

      {/* ── Phase: question ── */}
      {phase === "question" && (
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"40px 120px 40px", animation:"qSlide 0.35s ease" }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", width:"100%", maxWidth:1400, background:"linear-gradient(160deg,#0c1e8a,#070e52)", border:"3px solid #ffd700", borderRadius:20, padding:"60px 100px", boxShadow:"0 0 60px rgba(0,60,200,0.3)", marginBottom:32 }}>
            <p style={{ fontSize:52, color:"white", textAlign:"center", lineHeight:1.45, margin:0, fontWeight:400, letterSpacing:1, textTransform:"uppercase" }}>{question.q}</p>
          </div>
          <button onClick={() => { sounds.revealAnswer(); setPhase("judging"); }} className="reveal-hover"
            style={{ padding:"24px 120px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:26, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", transition:"all 0.15s" }}>
            REVEAL ANSWER
          </button>
        </div>
      )}

      {/* ── Phase: judging ── */}
      {phase === "judging" && (
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"24px 60px 32px", overflowY:"auto" }}>

          {/* Compact question reminder */}
          <div style={{ width:"100%", maxWidth:1200, background:"rgba(10,18,69,0.9)", border:"1px solid #1a3aab", borderRadius:12, padding:"16px 40px" }}>
            <p style={{ fontSize:20, color:"rgba(255,255,255,0.65)", textAlign:"center", margin:0, lineHeight:1.35, textTransform:"uppercase", letterSpacing:0.5 }}>{question.q}</p>
          </div>

          {/* Answer box */}
          <div style={{ width:"100%", maxWidth:1200, background:"rgba(255,215,0,0.08)", border:"3px solid #ffd700", borderRadius:14, padding:"18px 40px", textAlign:"center", animation:"answerReveal 0.35s ease", transformOrigin:"top" }}>
            <div style={{ fontSize:12, color:"#ffd700", letterSpacing:5, marginBottom:8 }}>CORRECT ANSWER</div>
            <div style={{ fontSize:32, color:"white", fontWeight:600, letterSpacing:1 }}>{question.a}</div>
          </div>

          {/* Team judging cards */}
          <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center", width:"100%" }}>
            {teams.map((t, i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"22px 26px", background:TEAM_BG[i], border:`2px solid ${TEAM_COLORS[i]}`, borderRadius:16, minWidth:210 }}>
                <div style={{ fontSize:15, color:TEAM_COLORS[i], letterSpacing:3 }}>{t.name.toUpperCase()}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", letterSpacing:2 }}>WAGERED {dollar(wagers[i])}</div>
                {judged[i] === null ? (
                  <div style={{ display:"flex", gap:10 }}>
                    <button onClick={() => judgeTeam(i, true)} className="award-hover"
                      style={{ padding:"12px 20px", background:"rgba(34,197,94,0.18)", border:"2px solid #22c55e", borderRadius:10, color:"#22c55e", fontSize:18, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:2, transition:"all 0.15s" }}>
                      ✓ CORRECT
                    </button>
                    <button onClick={() => judgeTeam(i, false)} className="award-hover"
                      style={{ padding:"12px 20px", background:"rgba(244,63,94,0.18)", border:"2px solid #f43f5e", borderRadius:10, color:"#f43f5e", fontSize:18, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:2, transition:"all 0.15s" }}>
                      ✗ WRONG
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:16, color: judged[i] ? "#22c55e" : "#f43f5e", letterSpacing:3, marginBottom:6 }}>
                      {judged[i] ? `+${dollar(wagers[i])}` : `-${dollar(wagers[i])}`}
                    </div>
                    <div style={{ fontSize:44, fontWeight:700, color:"white", fontVariantNumeric:"tabular-nums" }}>
                      {dollar(finalScores[i])}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {allJudged && (
            <button onClick={finish} className="reveal-hover"
              style={{ padding:"20px 80px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:24, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", transition:"all 0.15s" }}>
              SEE FINAL SCORES
            </button>
          )}
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
