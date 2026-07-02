import { useState, useEffect } from "react";
import { sounds } from "./sounds.js";

/* ── Question Bank (15 categories × 5 tiers × 10 questions each) ── */
const QUESTION_BANK = {
  "Characters": {
    200: [
      { q: "This man was swallowed by a great fish after running from God's call.", a: "Jonah" },
      { q: "This shepherd boy killed a giant with a sling and a stone before becoming Israel's greatest king.", a: "David" },
      { q: "He received the Ten Commandments on Mount Sinai and led Israel out of Egypt.", a: "Moses" },
      { q: "God told this man to build a massive ark to save his family and animals from a worldwide flood.", a: "Noah" },
      { q: "She was a young woman from Nazareth chosen by God to be the mother of Jesus.", a: "Mary" },
      { q: "This fisherman became the leader of Jesus' 12 disciples and once stepped out of a boat to walk on water.", a: "Peter" },
      { q: "This wild prophet wore camel-hair clothing, lived in the desert, and ate locusts and wild honey.", a: "John the Baptist" },
      { q: "He was Moses' brother who helped speak to Pharaoh and became Israel's first High Priest.", a: "Aaron" },
      { q: "This short tax collector climbed a sycamore tree just to see Jesus passing by.", a: "Zacchaeus" },
      { q: "He was the very first human being God formed from the dust of the ground.", a: "Adam" },
    ],
    400: [
      { q: "He was Israel's first king — chosen by God but later rejected for his disobedience.", a: "King Saul" },
      { q: "Israel's wisest king, he built the first temple in Jerusalem.", a: "Solomon" },
      { q: "Known as the 'father of faith,' he left his homeland at God's command not knowing where he was going.", a: "Abraham" },
      { q: "He was sold into slavery by his jealous brothers but eventually became second-in-command of all Egypt.", a: "Joseph" },
      { q: "She left her homeland of Moab to stay loyal to her widowed mother-in-law, saying 'Where you go, I will go.'", a: "Ruth" },
      { q: "This woman in Jericho hid two Israelite spies on her rooftop and was spared when the city fell.", a: "Rahab" },
      { q: "She risked her life by approaching the king of Persia uninvited to save her people from a deadly plot.", a: "Esther" },
      { q: "This judge of Israel was hiding in fear when an angel called him a 'mighty warrior' and sent him to defeat the Midianites with only 300 men.", a: "Gideon" },
      { q: "He was Paul's closest ministry partner on his first missionary journey. His name means 'Son of Encouragement.'", a: "Barnabas" },
      { q: "This young pastor received two letters from Paul, including the line 'Don't let anyone look down on you because you are young.'", a: "Timothy" },
    ],
    600: [
      { q: "This man wrestled with God all night and walked away with both a limp and a brand new name.", a: "Jacob (Israel)" },
      { q: "Israel's strongest man, he lost his power when his hair was cut by a woman.", a: "Samson" },
      { q: "He spent a night in a den of hungry lions and walked out completely unharmed.", a: "Daniel" },
      { q: "He succeeded Moses and led the Israelites across the Jordan River into the Promised Land.", a: "Joshua" },
      { q: "He was Elijah's apprentice who received a double portion of his mentor's spirit and performed twice as many recorded miracles.", a: "Elisha" },
      { q: "This apostle was the only one who did not flee at Jesus' arrest — he stood at the foot of the cross and later cared for Mary.", a: "John (the Apostle)" },
      { q: "He was the first follower of Jesus killed for his faith. As he was stoned to death, he prayed 'Lord, do not hold this sin against them.'", a: "Stephen" },
      { q: "He came to Jesus secretly at night and heard the famous words 'You must be born again.'", a: "Nicodemus" },
      { q: "This king of Judah became king at age 8 and later discovered the long-lost Book of the Law in the temple — and wept when it was read aloud.", a: "Josiah" },
      { q: "He was one of the twelve spies sent into Canaan. Alongside Joshua, he trusted God fully — and at age 85, he was still bold enough to take his mountain.", a: "Caleb" },
    ],
    800: [
      { q: "He was sold into slavery by his own brothers but rose to become second-in-command of all Egypt.", a: "Joseph" },
      { q: "God told this man to build a massive boat and fill it with animals before a great flood.", a: "Noah" },
      { q: "Known as the 'weeping prophet,' he was thrown into a muddy well for delivering God's unpopular message.", a: "Jeremiah" },
      { q: "This man lost all his children, wealth, and health in a single day — yet refused to curse God, and God restored him double in the end.", a: "Job" },
      { q: "He was Peter's brother and one of the first disciples Jesus called. He found his brother and declared 'We have found the Messiah.'", a: "Andrew" },
      { q: "This wealthy Bethlehem farmer showed great kindness to a foreign widow gleaning in his fields and became her kinsman-redeemer.", a: "Boaz" },
      { q: "He was Paul's companion thrown into a Philippian jail, where they sang hymns at midnight before an earthquake freed all the prisoners.", a: "Silas" },
      { q: "This king of Judah was told by Isaiah he would die from illness — but he prayed and wept, and God sent Isaiah back with new word: 'I will add 15 years to your life.'", a: "Hezekiah" },
      { q: "He traveled with Paul and Barnabas but abandoned the mission partway through — causing a sharp dispute between the two apostles on the next journey.", a: "John Mark" },
      { q: "God specifically called this craftsman by name and filled him with the Holy Spirit to give him extraordinary skill for building the tabernacle.", a: "Bezalel (Exodus 31)", d: ["Hiram of Tyre (the craftsman Solomon hired to build the temple ornaments)","Oholiab (Bezalel's assistant — both were filled with skill but only one was named first)","Tubal-Cain (Genesis 4:22 — the first craftsman mentioned in the Bible, a forger of tools)"] },
    ],
    1000: [
      { q: "This prophet called down fire from heaven on Mount Carmel to defeat 450 false prophets.", a: "Elijah" },
      { q: "This man rebuilt the walls of Jerusalem in just 52 days despite fierce opposition.", a: "Nehemiah" },
      { q: "God told this prophet to lie on his left side for 390 days and his right side for 40 days as a prophetic sign.", a: "Ezekiel" },
      { q: "This minor prophet dared to question God about why evil was winning. God's answer became the foundation of the New Testament teaching that 'the righteous shall live by faith.'", a: "Habakkuk" },
      { q: "This mysterious priest-king of Salem appeared briefly to bless Abraham and received his tithes. Hebrews describes him as a picture of Jesus' eternal priesthood.", a: "Melchizedek" },
      { q: "God directed this specific disciple in Damascus — through a vision — to go find the blinded Saul and restore his sight.", a: "Ananias (of Damascus, Acts 9)" },
      { q: "He was a powerful preacher from Alexandria who knew the scriptures well but only knew John's baptism — until Priscilla and Aquila took him aside and taught him more accurately.", a: "Apollos", d: ["Cornelius (the first Gentile convert, who received the Spirit before being taught more)","Philip (the evangelist who explained Isaiah 53 to the Ethiopian eunuch on the road)","Barnabas (who was sent from Jerusalem to investigate the new church in Antioch)"] },
      { q: "Paul wrote a short personal letter to this man, asking him to welcome back his runaway slave as a beloved brother in Christ.", a: "Philemon", d: ["Onesiphorus (who refreshed Paul in prison and was not ashamed of Paul's chains)","Epaphroditus (who nearly died bringing Paul a financial gift from the Philippian church)","Tychicus (whom Paul sent as a personal ambassador to several churches with letters)"] },
      { q: "She acted quickly when David was furious at her foolish husband Nabal — bringing a feast to prevent a massacre. David later married her.", a: "Abigail" },
      { q: "She is mentioned in Romans 16 as a deaconess in Cenchreae who personally carried Paul's letter to the Romans — likely the most important letter ever written.", a: "Phoebe (Romans 16:1-2)", d: ["Lydia (the first European convert who hosted Paul's missionary team in Philippi)","Priscilla (the tentmaker who, with her husband, corrected Apollos's incomplete doctrine)","Junia (mentioned in Romans 16 as notable among the apostles and imprisoned with Paul)"] },
    ],
  },
  "Life of Jesus": {
    200: [
      { q: "In what town was Jesus born?", a: "Bethlehem" },
      { q: "In what town did Jesus grow up?", a: "Nazareth" },
      { q: "What was the name of Jesus' earthly mother?", a: "Mary" },
      { q: "What was Jesus' trade or occupation before He began His public ministry?", a: "Carpenter" },
      { q: "Who baptized Jesus in the Jordan River?", a: "John the Baptist" },
      { q: "What were Jesus' 12 special followers called?", a: "Disciples" },
      { q: "What sea did Jesus walk on and calm a raging storm?", a: "The Sea of Galilee" },
      { q: "What special meal did Jesus share with His disciples the night before He was crucified?", a: "The Last Supper" },
      { q: "Jesus was crucified between two other men. Who were they?", a: "Two criminals" },
      { q: "Who tempted Jesus in the wilderness for 40 days?", a: "Satan (the devil)" },
    ],
    400: [
      { q: "What was Jesus' very first recorded miracle?", a: "Turning water into wine (wedding at Cana)" },
      { q: "What did Jesus say to calm a violent storm on the Sea of Galilee?", a: "\"Peace, be still\"" },
      { q: "Jesus called His first disciples from this occupation.", a: "Fishermen" },
      { q: "What was the name of Jesus' earthly father — the carpenter who raised Him?", a: "Joseph" },
      { q: "A Samaritan woman met Jesus at a well. What did Jesus offer her that was better than the well water?", a: "Living water" },
      { q: "Jesus told a story about a son who wasted his inheritance but was joyfully welcomed home. What is this parable called?", a: "The Parable of the Prodigal Son" },
      { q: "When Jesus was tempted by Satan in the wilderness, how did He respond to every temptation?", a: "He quoted Scripture (the Word of God)" },
      { q: "Peter's brother was also one of the first disciples Jesus called. What was his name?", a: "Andrew" },
      { q: "Jesus said 'I am the way, the truth, and the life — no one comes to the Father except through ___.' Fill in the blank.", a: "Me (John 14:6)", d: ["The Law (Romans 10:4)","Faith (Hebrews 11:6)","Love (John 15:12)"] },
      { q: "Jesus told His disciples to ask, seek, and knock. What does He promise will happen if you knock?", a: "The door will be opened to you (Matthew 7:7-8)", d: ["'Ask and you will receive, and your joy will be complete' (John 16:24)","'Seek and you will find; the reward is great' (Luke 11:9)","'Call to me and I will answer you' (Jeremiah 33:3)"] },
    ],
    600: [
      { q: "Jesus fasted for how many days in the wilderness before being tempted by Satan?", a: "40 days" },
      { q: "What famous sermon did Jesus preach on a hillside that began with the Beatitudes?", a: "The Sermon on the Mount", d: ["The Sermon by the Sea (delivered from a boat to the crowd on the shore)","The Temple Discourse (the farewell teaching in the Jerusalem temple courts)","The Upper Room Discourse (His farewell words to the disciples before the cross)"] },
      { q: "Jesus said 'I am the way, the truth, and the life' in which Gospel?", a: "John (John 14:6)", d: ["Luke (Luke 9:35)","Matthew (Matthew 16:16)","Mark (Mark 8:29)"] },
      { q: "Judas Iscariot prearranged a specific signal to help soldiers identify Jesus in the garden at night. What was this signal?", a: "A kiss (Matthew 26:48)", d: ["A handshake — Judas would greet him formally in front of the soldiers","A signal torch — Judas would carry a lamp and point it at Jesus","A spoken name — Judas would call out 'Teacher' loudly so the guards could surround Him"] },
      { q: "This Roman governor washed his hands before the crowd and sentenced Jesus to crucifixion despite declaring he found no fault in Him.", a: "Pontius Pilate" },
      { q: "What did Jesus say to the repentant thief on the cross next to Him who asked to be remembered?", a: "'Today you will be with me in paradise' (Luke 23:43)", d: ["'Your faith has saved you — go in peace' (Luke 7:50)","'I go to prepare a place for you and will return for you' (John 14:3)","'Truly I say to you, your sins are forgiven' (Luke 5:20)"] },
      { q: "The night before He died, Jesus broke bread and said 'This is my body.' What do Christians call this practice today?", a: "Communion (the Lord's Supper)", d: ["Baptism","The Passover Seder","The Eucharistic Fast"] },
      { q: "Jesus healed a blind man near the Pool of Siloam using an unusual method. What did He mix with dirt to make the healing mud?", a: "His own spit (saliva)", d: ["Water from the Pool of Siloam","Olive oil mixed with ash from the altar","A handful of clay from the Jordan River"] },
      { q: "Jesus drove out merchants and overturned the tables of money-changers in what location?", a: "The temple (the temple courts)", d: ["The marketplace of Jerusalem (just outside the city gate)","The synagogue in Capernaum (where He regularly taught on the Sabbath)","The house of the high priest Caiaphas (during the Passover feast)"] },
      { q: "When Jesus read from Isaiah's scroll in His hometown synagogue and said 'Today this scripture is fulfilled,' how did the crowd react?", a: "They were furious and tried to throw Him off a cliff (Luke 4:28-29)", d: ["They were amazed and asked each other 'Isn't this Joseph's son?' (Luke 4:22)","They believed and began to proclaim Jesus as the Messiah throughout Nazareth","They demanded signs and miracles to prove His claim before they would listen further"] },
    ],
    800: [
      { q: "What did Jesus say when He was 12 and His parents found Him in the temple?", a: "That He must be about His Father's business (Luke 2:49)", d: ["'Why were you searching for me? I was praying in the synagogue' (Luke 2:49)","'Did you not know that the angels watch over me?' (Luke 2:49)","'I was sitting with the teachers so I could learn the Law of Moses' (Luke 2:49)"] },
      { q: "Jesus rode into Jerusalem on what animal on Palm Sunday?", a: "A donkey (a colt, the foal of a donkey)", d: ["A white horse — fulfilling the prophecy of Zechariah 14:4","A camel — chosen because it was the animal of kings in that region","A boat — He arrived by the Sea of Galilee and entered through the eastern gate"] },
      { q: "When the Pharisees brought a woman caught in adultery to Jesus, what did He do before speaking?", a: "He bent down and wrote in the dirt/ground with His finger (John 8:6)", d: ["He stood silent for a long time and then turned and walked away from the crowd","He called a witness forward and asked them to testify to what they had actually seen","He quoted Leviticus 20 and said the law must be followed according to Moses' command"] },
      { q: "Two mysterious figures appeared with Jesus on the Mount of Transfiguration. Who were they?", a: "Moses and Elijah" },
      { q: "On the cross, Jesus cried 'My God, my God, why have you forsaken me?' — which is the opening line of which Psalm?", a: "Psalm 22", d: ["Psalm 69","Psalm 31","Psalm 88"] },
      { q: "When soldiers came to arrest Jesus and a disciple drew a sword and cut off the ear of the high priest's servant, what did Jesus do immediately after?", a: "He healed the servant's ear (Luke 22:51)", d: ["He rebuked the disciple and allowed the soldiers to bind His hands","He said 'Put it back' and then prayed for strength to endure what was coming","He told all twelve disciples to flee and meet Him back in Galilee after sunrise"] },
      { q: "Jesus said the greatest commandment is to love God with all your heart, soul, and mind. What is the SECOND greatest commandment?", a: "Love your neighbor as yourself (Matthew 22:39)", d: ["Honor your father and your mother (Exodus 20:12)","You shall not murder your brother (Matthew 5:21)","Do not covet anything that belongs to your neighbor (Exodus 20:17)"] },
      { q: "Jesus raised this man from the dead four days after his burial, telling him 'Come out!' — his sisters Mary and Martha were present.", a: "Lazarus (John 11)" },
      { q: "From which prophet's scroll did Jesus read in the Nazareth synagogue — the passage about bringing good news to the poor?", a: "Isaiah (Isaiah 61)", d: ["Jeremiah (Jeremiah 31)","Micah (Micah 5)","Ezekiel (Ezekiel 37)"] },
      { q: "When Jesus asked His disciples 'Who do you say I am?' — what was Peter's famous answer?", a: "'You are the Christ, the Son of the living God' (Matthew 16:16)", d: ["'You are the prophet Moses spoke about who was to come' (Deuteronomy 18:15)","'You are Elijah returned, sent ahead to prepare the Lord's way' (Malachi 4:5)","'You are the King of Israel, the one we have been waiting for' (John 12:13)"] },
    ],
    1000: [
      { q: "Name the three disciples Jesus took with Him to the Garden of Gethsemane the night He was arrested.", a: "Peter, James, and John", d: ["Andrew, Thomas, and Philip","Matthew, Bartholomew, and Simon the Zealot","James the Less, Thaddaeus, and Judas Iscariot"] },
      { q: "According to John 19:30, what were Jesus' final words on the cross?", a: "\"It is finished\"", d: ["\"Father, forgive them, for they know not what they do\" (Luke 23:34)","\"Father, into your hands I commit my spirit\" (Luke 23:46)","\"My God, my God, why have you forsaken me?\" (Matthew 27:46)"] },
      { q: "According to 1 Corinthians 15:6, Jesus appeared to more than how many people at one time after His resurrection?", a: "Over 500 people", d: ["Over 120 people","Over 3,000 people","Over 70 people"] },
      { q: "At the Last Supper, Jesus washed the disciples' feet. Which disciple initially refused to let Jesus wash his feet?", a: "Peter (John 13:8)" },
      { q: "According to John 19, who requested Jesus' body after the crucifixion and provided his own tomb for the burial?", a: "Joseph of Arimathea" },
      { q: "Jesus told a parable about 10 virgins waiting for a bridegroom. Five were wise and five were foolish. What made the five foolish virgins unprepared?", a: "They brought no extra oil for their lamps and missed the bridegroom", d: ["They fell asleep and failed to light their lamps in time when the bridegroom came","They did not know the wedding date and arrived a day too late for the celebration","They spent their waiting time at a neighbor's house and were not at the door when he arrived"] },
      { q: "In John 21, after the resurrection, Jesus asked Peter the same question three times. What was the question?", a: "'Do you love me?' (John 21:15-17)", d: ["'Do you believe in me?' (John 11:26)","'Will you follow me?' (John 21:22)","'Do you truly trust me?' (John 14:1)"] },
      { q: "What key phrase did Jesus pray in Gethsemane just moments before His arrest?", a: "'Not my will but yours be done' (Luke 22:42)", d: ["'Father, protect me from this hour, for this is the reason I came' (John 12:27)","'If it is possible, let this cup pass from me — yet as you will' (Matthew 26:39)","'I have finished the work you gave me to do — now glorify me' (John 17:4)"] },
      { q: "At His trial before Pilate, Jesus was silent to many accusations — but He did briefly answer one question. What did Pilate ask?", a: "'Are you the King of the Jews?' — Jesus replied 'You have said so'", d: ["'Are you the Son of God?' — Jesus replied 'I am and you will see the Son of Man seated at God's right hand'","'Are you a prophet?' — Jesus replied 'You are correct in what you have said'","'Where are you from?' — Jesus replied 'My kingdom is not of this world'"] },
      { q: "What was unusual about the grave clothes Peter found inside the empty tomb on resurrection morning?", a: "They were lying there undisturbed, with the head cloth folded separately (John 20:6-7)", d: ["They had been torn in two from top to bottom, matching what happened to the temple veil","They were completely gone — the tomb was totally empty with nothing left inside","They were drenched in the burial spices, still giving off a strong aroma of myrrh and aloe"] },
    ],
  },
  "Miracles": {
    200: [
      { q: "Jesus fed over 5,000 people with this tiny meal.", a: "5 loaves and 2 fish" },
      { q: "Jesus turned water into wine at a wedding in this town.", a: "Cana" },
      { q: "God provided this bread-like food from heaven to feed the Israelites in the desert.", a: "Manna" },
      { q: "What did God tell the Israelites to put on their doorposts on Passover night to protect their families from the final plague?", a: "The blood of a lamb" },
      { q: "What did Jesus say to calm the violent storm on the Sea of Galilee?", a: "'Peace, be still'" },
      { q: "God dried up this river so the Israelites could walk across on dry ground into the Promised Land.", a: "The Jordan River (Joshua 3)" },
      { q: "During the 10 plagues of Egypt, what did Moses' staff turn the Nile River into with the very first plague?", a: "Blood" },
      { q: "During the storm on the Sea of Galilee, where was Jesus while His terrified disciples bailed water?", a: "Asleep in the back of the boat" },
      { q: "God provided water for the thirsty Israelites in the desert by telling Moses to do what to a rock?", a: "Strike it with his staff" },
      { q: "Three Hebrew men — Shadrach, Meshach, and Abednego — came out of King Nebuchadnezzar's fiery furnace without a single burn. What did the king see in the fire with them?", a: "A fourth mysterious figure ('like a son of the gods')" },
    ],
    400: [
      { q: "Jesus raised this man from the dead after he had already been in the tomb for four days.", a: "Lazarus" },
      { q: "Jesus healed 10 lepers — but only one came back to say thank you. What nationality was he?", a: "He was a Samaritan (Luke 17:16)" },
      { q: "God caused the walls of this city to fall after Israel marched around it for seven days.", a: "Jericho" },
      { q: "Jesus healed a paralyzed man who was lowered through a hole in a roof by his friends. What did Jesus say FIRST before healing the man?", a: "'Your sins are forgiven'" },
      { q: "Elijah called down fire from heaven at Mount Carmel to prove that the Lord — not Baal — was the true God. How many prophets of Baal were defeated that day?", a: "450 prophets of Baal" },
      { q: "What did the disciples think Jesus was when they first saw Him walking toward them on the water?", a: "A ghost" },
      { q: "An angel of the Lord struck down 185,000 Assyrian soldiers in a single night. During which king of Judah's reign did this happen?", a: "King Hezekiah (2 Kings 19)" },
      { q: "When Moses stretched out his hand and God parted the Red Sea, what happened to the Egyptian army that followed Israel in?", a: "The waters came back and they drowned" },
      { q: "Jesus healed ten men with leprosy and told them to go show themselves to the priest. How many actually came back to thank Him?", a: "Only one (a Samaritan)" },
      { q: "God caused the sun to stand still for nearly a whole day during a battle in answer to whose prayer?", a: "Joshua's prayer (Joshua 10:13)" },
    ],
    600: [
      { q: "God parted this body of water so Moses and the Israelites could escape Egypt on dry ground.", a: "The Red Sea" },
      { q: "Elisha healed the leprosy of this Syrian army commander by telling him to dip in the Jordan River seven times.", a: "Naaman (2 Kings 5)" },
      { q: "Jesus healed a man who had been unable to walk for how many years, at the Pool of Bethesda?", a: "38 years (John 5:5)" },
      { q: "Jesus cast a legion of demons out of a man. Where did the demons beg Jesus to send them?", a: "Into a herd of pigs (which then ran off a cliff into the sea)" },
      { q: "Before Elijah's fire fell on Mount Carmel, he made the sacrifice difficult to burn by pouring water on it. How many times did he pour water on it?", a: "Three times (1 Kings 18:34)" },
      { q: "When Peter and John healed a lame man at the temple gate called Beautiful, the man had been unable to walk from what age?", a: "Birth (Acts 3:2)" },
      { q: "God miraculously preserved Daniel's three friends from the fiery furnace. What were their Hebrew names?", a: "Hananiah, Mishael, and Azariah (Babylonian: Shadrach, Meshach, Abednego)", d: ["Marduk, Belteshazzar, and Nebo (their Babylonian court names)","Ezra, Nehemiah, and Zerubbabel (leaders of the return from exile)","Gershom, Kohath, and Merari (the three sons of Levi in the Old Testament)"] },
      { q: "Elisha performed a miracle involving a borrowed ax head that fell into the Jordan River. What did he do to retrieve it?", a: "He threw a stick into the water and the iron ax head floated (2 Kings 6:5-6)", d: ["He stretched his staff across the river and commanded the water to divide so they could retrieve it","He prayed and the river current pushed the ax head to the shore where he picked it up","He sent the man who dropped it to wade in and feel the riverbed until he found it"] },
      { q: "When Jesus fed the 4,000 (a different miracle from the 5,000), how many loaves did He start with?", a: "Seven loaves and a few small fish (Matthew 15:34)", d: ["Five loaves and two fish (the same as the feeding of the 5,000)","Ten loaves and three fish (given by a boy in the crowd)","Two loaves and seven fish (collected from the disciples' own provisions)"] },
      { q: "This Levite led a famous rebellion against Moses, claiming Moses had taken too much authority. God judged him by causing the ground to split open and swallow him alive.", a: "Korah (Numbers 16)" },
    ],
    800: [
      { q: "Peter walked on water briefly — but sank when he did this one thing. What was it?", a: "He took his eyes off Jesus and looked at the storm (he doubted)", d: ["He tried to run toward Jesus too fast and lost his footing in a wave","He spoke out loud saying 'I believe I can walk' and his pride caused him to sink","He reached down to check if the water was solid beneath him and broke his concentration"] },
      { q: "What happened immediately when Paul was bitten by a deadly snake on the island of Malta?", a: "He shook it off and was completely unharmed (Acts 28)" },
      { q: "God struck this man dead for reaching out to steady the Ark of the Covenant when the oxen stumbled.", a: "Uzzah (2 Samuel 6:7)" },
      { q: "When Paul healed a crippled man in Lystra who had never walked, the crowd had an unusual reaction. What did they try to do?", a: "Worship Paul and Barnabas as the gods Zeus and Hermes", d: ["They stoned Paul and dragged him outside the city, thinking he was dead","They demanded Paul and Barnabas perform more miracles to prove their authority","They called for the city elders to appoint Paul as their new high priest"] },
      { q: "The shadow of which apostle was believed to heal sick people as it fell on them?", a: "Peter (Acts 5:15)" },
      { q: "Jesus healed a man born blind by making mud. He told the man to go wash in which pool?", a: "The Pool of Siloam (John 9:7)" },
      { q: "God caused the shadow on King Hezekiah's sundial to move backward as a sign that Hezekiah would recover. How many steps backward?", a: "Ten steps (Isaiah 38:8)", d: ["Seven steps (Isaiah 38:8)","Fifteen steps (Isaiah 38:8)","Three steps (Isaiah 38:8)"] },
      { q: "God sent an angel who struck the wrong-doing Herod Agrippa I with a fatal illness during a speech. What was the immediate cause of his death, according to Acts 12?", a: "He was eaten by worms because he did not give glory to God (Acts 12:23)", d: ["He was struck blind and fell from his throne, dying of his injuries three days later","His heart stopped while he was still speaking, and he fell down in front of the crowd","He was tormented by an evil spirit and died in great agony before the next day"] },
      { q: "Who broke God's command about keeping the plunder of Jericho, causing Israel to lose the next battle against the small city of Ai?", a: "Achan (Joshua 7)" },
      { q: "In the New Testament, Paul raised a young man named Eutychus who fell from a third-floor window during a long sermon. In what city did this happen?", a: "Troas (Acts 20:9-12)" },
    ],
    1000: [
      { q: "What miracle did Elisha perform for a widow involving jars of oil?", a: "He multiplied her small amount of oil to fill every jar she had (2 Kings 4)", d: ["He turned the widow's empty jars into solid gold so she could sell them to pay her debts","He caused rain to fall on her field so her olive trees would produce oil again","He prayed and a jar of oil appeared on her doorstep every morning for forty days"] },
      { q: "Elijah prayed and it stopped raining. How long did the drought last?", a: "Three and a half years (James 5:17)", d: ["Seven years","Two years","Forty days and forty nights"] },
      { q: "What miracle happened inside the temple at the exact moment Jesus died on the cross?", a: "The veil (curtain) of the temple was torn in two from top to bottom", d: ["The golden lampstand went dark and could not be relit for three days","The altar of incense cracked in half and no smoke arose from it","The sacred lots used by the priests fell out of their container and could not be found"] },
      { q: "God struck Elisha's servant Gehazi with leprosy as punishment. What had Gehazi done?", a: "He secretly ran after Naaman and lied to get silver and clothing (2 Kings 5:20-27)", d: ["He boasted to the Aramean generals that Elisha's power came from Israel's army","He kept the first ten percent of each healing gift for himself without telling Elisha","He charged Naaman money to deliver Elisha's message before the healing took place"] },
      { q: "The early church couple Ananias and Sapphira were both struck dead for what specific sin?", a: "Lying about how much money they kept from selling property (Acts 5)", d: ["Eating meat sacrificed to idols and then lying to the church elders about it","Accepting stolen goods from a pagan merchant and claiming it was a legitimate gift","Taking communion unworthily and then denying it when Peter confronted them"] },
      { q: "When the Israelites grumbled in the desert and God sent quail for them to eat, what terrible thing happened immediately after they ate?", a: "A severe plague struck the people who craved meat (Numbers 11:33)", d: ["The quail went bad overnight and made them all violently sick for a week","God dried up all the springs in the desert as punishment for their ungratefulness","Moses struck the rock in anger and God said only their children would taste meat again"] },
      { q: "Elijah brought a widow's son back to life during a famine in Zarephath. What did he do three times while praying over the boy?", a: "He stretched himself out over the boy's body (1 Kings 17:21)", d: ["He poured water over the boy and called out his name three times in a loud voice","He placed his hands on the boy's chest and breathed into his mouth three times","He anointed the boy's forehead with oil and prayed 'Let this child's life return to him'"] },
      { q: "What did Isaiah tell King Hezekiah to apply to his infected skin to be healed — a remedy God instructed alongside the miraculous sign?", a: "A poultice of figs (Isaiah 38:21)", d: ["A mixture of olive oil, cedar sap, and hyssop leaves pressed into a cloth","Cedar oil mixed with salt from the Dead Sea region applied morning and evening","Honey mixed with myrrh and wrapped in clean linen from the temple storeroom"] },
      { q: "An iron ax head sank into the Jordan River and Elisha made it float. What does this reveal about the ax head that made it extra valuable to the worker?", a: "It was borrowed — he couldn't afford to replace it (2 Kings 6:5)", d: ["It was new — he had just purchased it and had not yet made a single cut with it","It was ancient — it had been passed down from Elijah himself and was irreplaceable","It was ceremonial — it belonged to the temple and must be returned without a scratch"] },
      { q: "God sent fire that consumed Elijah's sacrifice on Mount Carmel — including the water, the wood, the stones, and the soil. What did all the people say when this happened?", a: "'The Lord — He is God! The Lord — He is God!' (1 Kings 18:39)", d: ["'Elijah is a prophet! Elijah is a prophet!' — and they all bowed before him","'Baal has been judged! Baal has been judged!' — and they scattered in fear","'Show us a sign! Show us a sign!' — and the prophets of Baal rose up again"] },
    ],
  },
  "Women of the Bible": {
    200: [
      { q: "This woman said 'wherever you go, I will go' to her mother-in-law.", a: "Ruth" },
      { q: "This woman hid two Israelite spies on her rooftop in Jericho and was saved when the city fell.", a: "Rahab" },
      { q: "She was a seller of purple fabric in Philippi and became Paul's first European convert.", a: "Lydia (Acts 16)" },
      { q: "This woman was the mother of Jesus.", a: "Mary" },
      { q: "This brave Jewish queen saved her people from a plot to destroy them.", a: "Esther" },
      { q: "She was the first woman God created, formed from Adam's rib.", a: "Eve" },
      { q: "This woman was the mother of John the Baptist and a relative of Mary.", a: "Elizabeth" },
      { q: "She anointed Jesus' feet with expensive perfume and wiped them with her hair.", a: "Mary of Bethany (John 12)" },
      { q: "This woman was the first person Jesus appeared to after His resurrection.", a: "Mary Magdalene" },
      { q: "She drew baby Moses out of the Nile River and raised him as her own son in Pharaoh's palace.", a: "Pharaoh's daughter (Exodus 2:5-10)" },
    ],
    400: [
      { q: "She was the first person to speak to Jesus after His resurrection.", a: "Mary Magdalene" },
      { q: "She was Moses' sister who led the women in a song of praise after crossing the Red Sea.", a: "Miriam" },
      { q: "This wife of Abraham laughed out loud when she overheard that she would have a son in old age.", a: "Sarah" },
      { q: "This woman was Moses' mother who hid him in a basket on the Nile River to save him from Pharaoh's death decree.", a: "Jochebed (Exodus 6:20)" },
      { q: "She was the first female judge in Israel and also a prophetess who led the army to victory.", a: "Deborah" },
      { q: "This woman wept at the temple so intensely that the priest thought she was drunk — but she was praying for a son.", a: "Hannah (1 Samuel 1)" },
      { q: "She was the mother of both Jacob and Esau — and she helped Jacob deceive his father to steal the blessing.", a: "Rebekah" },
      { q: "This woman was Jacob's beloved wife and the mother of Joseph and Benjamin. She died giving birth to her second son.", a: "Rachel" },
      { q: "Lot's wife disobeyed the angel's instructions and looked back at Sodom. What happened to her?", a: "She turned into a pillar of salt (Genesis 19:26)", d: ["She was blinded permanently and could no longer see light or color","She was swept up in the fire and brimstone that destroyed the city","She was struck down dead on the spot and buried under the falling ash"] },
      { q: "This woman drew water from a well for Abraham's servant and his camels — a sign that she was the right bride for Isaac.", a: "Rebekah (Genesis 24)" },
    ],
    600: [
      { q: "This queen risked her life approaching the king uninvited to save her people from genocide.", a: "Esther" },
      { q: "She anointed Jesus' feet with expensive perfume and wiped them with her hair.", a: "Mary of Bethany (John 12)" },
      { q: "She was the first female judge in Israel and also a prophetess.", a: "Deborah" },
      { q: "This woman nagged Samson relentlessly until he revealed the secret of his strength.", a: "Delilah" },
      { q: "This woman was the mother-in-law of Ruth. After losing her husband and both sons, she changed her name to 'Mara,' meaning bitter.", a: "Naomi (Ruth 1:20)" },
      { q: "She acted quickly when David was furious at her foolish husband Nabal — bringing supplies to prevent bloodshed — and David later married her.", a: "Abigail (1 Samuel 25)" },
      { q: "This woman recognized that the voice of Mary was the mother of her Lord before Jesus was even born.", a: "Elizabeth (Luke 1:43)" },
      { q: "She was a tentmaker and, along with her husband, took Apollos aside and explained the way of God more accurately.", a: "Priscilla (Acts 18:26)" },
      { q: "This woman poured out her heart to God for a son, made a vow to dedicate the child to the Lord, and her son became one of Israel's greatest prophets.", a: "Hannah (mother of Samuel, 1 Samuel 1)" },
      { q: "She was Jacob's first wife, who was loved less than her sister — but God opened her womb and she bore six of the twelve tribes of Israel.", a: "Leah", d: ["Rachel","Zilpah","Bilhah"] },
    ],
    800: [
      { q: "This woman nagged Samson relentlessly until he finally revealed the secret of his strength.", a: "Delilah" },
      { q: "This prophetess recognized the infant Jesus in the temple and spoke about Him to everyone who was waiting for redemption.", a: "Anna (Luke 2:36-38)" },
      { q: "She was a tentmaker and, along with her husband Aquila, took Apollos aside and explained the way of God more accurately.", a: "Priscilla (Acts 18:26)" },
      { q: "This woman in the early church was struck dead for lying about how much money she and her husband gave from a land sale.", a: "Sapphira (Acts 5)" },
      { q: "She is described in Romans 16:1 as a deaconess of the church who personally carried Paul's letter to Rome.", a: "Phoebe" },
      { q: "This woman was Rachel's servant who became the mother of two of Jacob's twelve sons — Dan and Naphtali.", a: "Bilhah" },
      { q: "This woman from Shunem prepared a special room in her home for Elisha every time he passed through. God rewarded her with a son.", a: "The Shunammite woman (2 Kings 4)" },
      { q: "At the tomb on resurrection morning, angels asked this woman why she was weeping. She mistook the risen Jesus for the gardener.", a: "Mary Magdalene (John 20)" },
      { q: "She was Jacob's favorite wife, the mother of Joseph and Benjamin, and she died giving birth to her second son.", a: "Rachel" },
      { q: "This woman had been bent double for 18 years — crippled by a spirit — until Jesus healed her in the synagogue on the Sabbath.", a: "The bent woman (Luke 13:11-13)", d: ["The Syrophoenician woman (whose daughter was healed from a distance)","The woman with the issue of blood (who touched the hem of Jesus' garment)","The woman at the well (whom Jesus told about living water in Samaria)"] },
    ],
    1000: [
      { q: "This woman in the early church was struck dead for lying about how much money she gave to God.", a: "Sapphira (Acts 5)" },
      { q: "Proverbs 31 says a virtuous woman is worth far more than what precious stone?", a: "Rubies (Proverbs 31:10)" },
      { q: "This woman was the mother-in-law of Ruth. After losing her husband and both sons, she told people to call her 'Mara,' meaning bitter.", a: "Naomi (Ruth 1:20)" },
      { q: "This woman is mentioned in Hebrews 11's Hall of Faith as an example of faith — the only Gentile woman in that list.", a: "Rahab (Hebrews 11:31)" },
      { q: "She was a prophetess in Jerusalem during the reign of King Josiah. When the Book of the Law was found, it was brought to her for a word from God.", a: "Huldah (2 Kings 22:14)" },
      { q: "She was Samson's mother, a barren woman visited by an angel who told her to never let a razor touch the child's head.", a: "The wife of Manoah (her name is never recorded in scripture)" },
      { q: "The Proverbs 31 woman gets up while it is still night to do what two things?", a: "She provides food for her family and portions for her servant girls (Proverbs 31:15)", d: ["She prays and meditates on Scripture before any household task begins","She inspects the household accounts and plans the day's purchases and expenses","She weaves linen cloth and tends to her vineyard before dawn breaks"] },
      { q: "This woman from Thyatira is condemned in Revelation 2 for leading God's people into sexual immorality and idol worship — compared to an Old Testament queen.", a: "'Jezebel' (Revelation 2:20)", d: ["'Delilah' (condemned for weakening the church's spiritual resolve)","'Herodias' (condemned for demanding judgment against God's prophets)","'Athaliah' (condemned for seizing authority over the congregation by force)"] },
      { q: "The daughters of Zelophehad brought an unprecedented legal case before Moses. What did they ask for, and why?", a: "They asked to inherit their father's land since he had no sons — and God ruled in their favor (Numbers 27)", d: ["They asked to be counted in the tribal census alongside their male relatives so their family line would not be lost","They asked Moses to let them cross into Canaan first as their father had died faithful in the wilderness","They asked that their names be written into the Book of Life so their father's memory would not perish"] },
      { q: "This woman anointed Jesus' feet days before the crucifixion with expensive nard worth nearly a year's wages. Jesus said her act would be remembered wherever the gospel is preached.", a: "Mary of Bethany (Mark 14:9)" },
    ],
  },
  "Numbers & Facts": {
    200: [
      { q: "How many days and nights did it rain during Noah's flood?", a: "40 days and 40 nights" },
      { q: "How many commandments did God give Moses on Mount Sinai?", a: "10 commandments" },
      { q: "How many days was Jesus in the tomb before rising from the dead?", a: "3 days" },
      { q: "How many days did Jesus fast in the wilderness before Satan tempted Him?", a: "40 days" },
      { q: "How many books are in the New Testament?", a: "27 books" },
      { q: "How many books are in the Old Testament?", a: "39 books" },
      { q: "How many men did Jesus choose as His closest disciples?", a: "12" },
      { q: "How many people survived the great flood inside Noah's ark?", a: "8 people (Noah, his wife, his 3 sons, and their wives)" },
      { q: "How many lepers did Jesus heal at one time — but only one came back to give thanks?", a: "10 lepers" },
      { q: "According to Genesis, how many days did God take to create the world before resting?", a: "6 days (He rested on the 7th)" },
    ],
    400: [
      { q: "How many books are in the entire Bible?", a: "66 books" },
      { q: "How many Psalms are in the book of Psalms?", a: "150 Psalms" },
      { q: "How many pieces of silver was Jesus betrayed for?", a: "30 pieces of silver" },
      { q: "How many years did the Israelites wander in the desert before entering the Promised Land?", a: "40 years" },
      { q: "How many times did Peter deny Jesus the night of His arrest?", a: "Three times" },
      { q: "How many plagues did God send on Egypt before Pharaoh released the Israelites?", a: "10 plagues" },
      { q: "How many times did God tell Joshua to march around Jericho on the final day?", a: "Seven times (Joshua 6:4)" },
      { q: "How many days was Lazarus in the tomb before Jesus raised him?", a: "4 days (John 11:17)" },
      { q: "How many loaves of bread did Jesus use to feed the crowd of 5,000?", a: "5 loaves" },
      { q: "How many books of the Bible did the apostle Paul write?", a: "13 books (Romans through Philemon)" },
    ],
    600: [
      { q: "How many disciples did Jesus choose?", a: "12" },
      { q: "How many years did the Israelites wander in the desert before entering the Promised Land?", a: "40 years" },
      { q: "How many fruits of the Spirit does Paul list in Galatians 5?", a: "Nine (9)" },
      { q: "How many chapters are in the longest book of the Bible — the book of Psalms?", a: "150 chapters" },
      { q: "James 5:17 tells us Elijah prayed for drought and it did not rain. According to James and Luke, how long did the drought last?", a: "Three and a half years (42 months)", d: ["Seven years","Two years","One year"] },
      { q: "How many 'I AM' statements does Jesus make in the Gospel of John?", a: "Seven (7)", d: ["Five (5)","Nine (9)","Twelve (12)"] },
      { q: "How many years did Solomon take to build the temple in Jerusalem?", a: "7 years (1 Kings 6:38)", d: ["20 years","3 years","13 years"] },
      { q: "How many wise men visited baby Jesus? (Be careful — the Bible doesn't actually say!)", a: "The Bible never specifies a number — only that they brought three types of gifts", d: ["Three — because there were three types of gifts (gold, frankincense, and myrrh)","Two — the text says 'some wise men' arrived from the east together","Twelve — one for each tribe of Israel they were searching for"] },
      { q: "How many letters (books) in the Bible are written by John the Apostle?", a: "5 (Gospel of John, 1 John, 2 John, 3 John, Revelation)", d: ["3 (1 John, 2 John, 3 John)","4 (Gospel of John, 1 John, 2 John, 3 John)","2 (Gospel of John and Revelation)"] },
      { q: "How many times per day did Daniel pray while exiled in Babylon, even after it was made illegal?", a: "Three times a day (Daniel 6:10)", d: ["Seven times a day","Once a day","Five times a day"] },
    ],
    800: [
      { q: "How many plagues did God send on Egypt before Pharaoh let the Israelites go?", a: "10 plagues" },
      { q: "Paul says he received 'forty lashes minus one' how many times from the Jewish leaders?", a: "Five times (2 Corinthians 11:24)", d: ["Three times","Seven times","Twice"] },
      { q: "In Revelation, what is the number of the beast?", a: "666 (Revelation 13:18)" },
      { q: "How many years did Jacob work to earn Rachel as his wife — and how many total did he end up working?", a: "14 years total (seven for Leah, seven more for Rachel)", d: ["7 years total (only for Rachel, the deception cost him nothing extra)","21 years total (seven for Leah, seven for Rachel, seven more for flocks)","10 years total (five for Leah and five for Rachel under a revised agreement)"] },
      { q: "How many pieces of armor does Paul list in the 'full armor of God' in Ephesians 6?", a: "6 pieces: belt, breastplate, shoes, shield, helmet, and sword", d: ["4 pieces: breastplate, shield, helmet, and sword (Ephesians 6)","7 pieces: belt, breastplate, shoes, shield, helmet, sword, and lance","5 pieces: breastplate, shoes, shield, helmet, and sword (no belt listed)"] },
      { q: "How many verses are in Psalm 119, making it the longest single chapter in the Bible?", a: "176 verses", d: ["150 verses","200 verses","128 verses"] },
      { q: "How many times did Joshua's army march around Jericho in total (over all seven days)?", a: "13 times total (once each day for 6 days, then 7 times on day 7)", d: ["7 times total (once each day for seven days)","14 times total (twice each day for seven days)","8 times total (once each for six days, twice on day seven)"] },
      { q: "According to Acts, how many people were added to the church on the Day of Pentecost?", a: "About 3,000 people (Acts 2:41)" },
      { q: "How many men were in Gideon's final army when they defeated the Midianites?", a: "300 men (Judges 7:7)" },
      { q: "How many years did it take Nehemiah to rebuild the walls of Jerusalem?", a: "52 days (Nehemiah 6:15)" },
    ],
    1000: [
      { q: "Methuselah is the oldest person in the Bible. How old was he when he died?", a: "969 years old (Genesis 5:27)" },
      { q: "After the resurrection, Jesus told the disciples to cast their net on the right side. How many fish did they haul in?", a: "153 fish (John 21:11)", d: ["99 fish","276 fish","40 fish"] },
      { q: "According to Revelation, how many gates does the New Jerusalem have?", a: "12 gates (Revelation 21:12)", d: ["7 gates","24 gates","4 gates"] },
      { q: "How many years did the Israelites live as slaves in Egypt before the Exodus?", a: "430 years (Exodus 12:40)", d: ["400 years","200 years","70 years"] },
      { q: "How many chapters are in the longest book of the Bible by chapter count?", a: "Psalms with 150 chapters" },
      { q: "How many Beatitudes does Jesus list in the Sermon on the Mount in Matthew 5?", a: "Eight (8)", d: ["Seven (7)","Ten (10)","Twelve (12)"] },
      { q: "According to Revelation 7:4, how many people are sealed from the tribes of Israel?", a: "144,000 (12,000 from each of the 12 tribes)", d: ["7,000 (1,000 from each of the 7 remaining tribes)","24,000 (2,000 from each of the 12 tribes)","120,000 (10,000 from each of the 12 tribes)"] },
      { q: "How many years passed between the Old and New Testaments (the 'silent years')?", a: "Approximately 400 years", d: ["Approximately 70 years","Approximately 200 years","Approximately 600 years"] },
      { q: "Revelation is addressed to 7 churches. Which church was warned it was 'neither hot nor cold' and at risk of being 'spit out'?", a: "Laodicea (Revelation 3:16)", d: ["Ephesus (Revelation 2:4)","Sardis (Revelation 3:1)","Pergamum (Revelation 2:12)"] },
      { q: "According to Numbers 14, how old did someone have to be to be counted in the Israelite military census?", a: "20 years old and above (Numbers 14:29)", d: ["30 years old and above","25 years old and above","15 years old and above"] },
    ],
  },
  "The Early Church": {
    200: [
      { q: "On what special day did the Holy Spirit first fall on the disciples in the upper room?", a: "Pentecost (Acts 2)" },
      { q: "Approximately how many people were baptized and added to the church on the day of Pentecost?", a: "About 3,000 people (Acts 2:41)" },
      { q: "What two visible and audible signs confirmed the arrival of the Holy Spirit at Pentecost?", a: "Tongues of fire and the sound of a mighty rushing wind (Acts 2)", d: ["An earthquake and a blinding light that filled the upper room where they were gathered","The disciples began speaking in unknown languages and singing psalms simultaneously","Clouds filled the room and the disciples were lifted off the ground for a short time"] },
      { q: "Who preached the first sermon of the early church on the Day of Pentecost?", a: "Peter (Acts 2)" },
      { q: "After Jesus rose from the dead and before Pentecost, His followers gathered together and did what?", a: "They prayed and waited together (about 120 people, Acts 1:14-15)" },
      { q: "Who was the first Christian martyr — killed by stoning while he saw Jesus standing at God's right hand?", a: "Stephen (Acts 7)" },
      { q: "According to Acts 2:42, the early church devoted themselves to four specific things. What were all four?", a: "Teaching, fellowship, breaking of bread, and prayer (Acts 2:42)", d: ["Preaching, fasting, giving, and worship (described in Acts 4)","Baptism, mission, service, and study (the four pillars of the early church)","Singing, healing, feeding the poor, and prophesying (Acts 2-4)"] },
      { q: "What miraculous gift did the disciples receive at Pentecost that allowed them to speak to people from many nations?", a: "Speaking in other tongues (Acts 2:4)" },
      { q: "Before Pentecost, Jesus told His disciples to wait in Jerusalem for what?", a: "The gift of the Holy Spirit (Acts 1:4-5)" },
      { q: "In the early church, believers sold their possessions and shared everything. What was the result?", a: "There were no needy people among them (Acts 4:34)" },
    ],
    400: [
      { q: "This man held the coats of those who stoned Stephen — and later became the greatest missionary in history.", a: "Saul (Paul)" },
      { q: "Who was the first Christian martyr, killed by stoning while he saw a vision of heaven?", a: "Stephen (Acts 7)" },
      { q: "An angel freed Peter from prison. When he knocked at the door, who answered and was so stunned she left him standing outside?", a: "Rhoda (Acts 12:13)" },
      { q: "A couple in the early church died for lying to God about money from a land sale. Who were they?", a: "Ananias and Sapphira (Acts 5)" },
      { q: "Paul's name was changed from Saul. In what dramatic way did he first encounter Jesus?", a: "A blinding light knocked him off his horse on the road to Damascus (Acts 9)" },
      { q: "The early church chose a replacement apostle to fill Judas's spot. What was his name and how was he chosen?", a: "Matthias — chosen by casting lots (Acts 1:26)", d: ["Barnabas — chosen by a unanimous vote of the 120 disciples gathered in Jerusalem","Stephen — chosen by Peter because he had followed Jesus from the beginning","Barsabbas — chosen by the Holy Spirit speaking through the prophet Agabus"] },
      { q: "Philip told a man riding in a chariot the good news from Isaiah 53 — and immediately baptized him. Who was this man?", a: "The Ethiopian eunuch (Acts 8)" },
      { q: "Peter healed a man named Aeneas who had been paralyzed and bedridden for how many years?", a: "Eight years (Acts 9:33)" },
      { q: "God told Peter in a vision about a sheet lowered from heaven full of unclean animals. What was the spiritual lesson?", a: "That God does not show favoritism — Gentiles are not unclean (Acts 10:15)" },
      { q: "The first church was established in Jerusalem. The second major center of early Christianity was in what city?", a: "Antioch (Acts 11:26)" },
    ],
    600: [
      { q: "Peter and John told a lame man they had no silver or gold. What did they give him instead?", a: "Healing in the name of Jesus Christ (Acts 3:6)" },
      { q: "Philip was led by the Spirit to explain Isaiah 53 to a royal official from this African kingdom.", a: "Ethiopia (Acts 8)" },
      { q: "Peter first shared the Gospel with Gentiles when he visited the home of this Roman centurion.", a: "Cornelius (Acts 10)" },
      { q: "Paul and his companions were forbidden by the Holy Spirit to preach in Asia. God instead redirected them to what continent through a vision?", a: "Europe (Acts 16:9)" },
      { q: "The believers in Berea were called 'more noble' than the Thessalonians for one specific reason. What was it?", a: "They examined the scriptures daily to verify whether what Paul said was true (Acts 17:11)", d: ["They received Paul warmly and provided housing for his entire missionary team","They sent financial support to other struggling churches before Paul even asked them","They immediately formed a church council to organize and appoint leaders"] },
      { q: "Paul preached to Athenian philosophers at the Areopagus (Mars Hill) about 'the unknown god.' What was the audience's reaction?", a: "Some mocked, some wanted to hear more, and a few believed (Acts 17:32-34)", d: ["They unanimously rejected his message and ordered him to leave the city immediately","They debated among themselves for days but ultimately sent him a polite letter of refusal","They agreed with Paul's arguments but said they needed more time to think before committing"] },
      { q: "Saul's name changed to Paul. At what point in Acts does the name 'Paul' first appear?", a: "Acts 13:9", d: ["Acts 9:1","Acts 11:25","Acts 15:12"] },
      { q: "Paul was bitten by a deadly snake on the island of Malta. When nothing happened to him, what did the locals say?", a: "That he must be a god (Acts 28:6)" },
      { q: "What was the name of the silversmith in Ephesus who started a riot against Paul because his preaching was hurting the idol-making business?", a: "Demetrius (Acts 19:24)" },
      { q: "After Stephen was martyred, a great persecution broke out against the church. What was the unexpected result?", a: "Believers scattered and spread the gospel everywhere they went (Acts 8:1-4)", d: ["The church went underground and grew stronger through secret house meetings in Jerusalem","The apostles were arrested but immediately released by angels and resumed public preaching","The church shrunk to just the twelve apostles and a small core group in Jerusalem"] },
    ],
    800: [
      { q: "An angel freed this apostle from prison the night before his scheduled execution while believers prayed.", a: "Peter (Acts 12)" },
      { q: "Paul and Silas were singing hymns in a Philippian jail at midnight when this happened.", a: "An earthquake shook the prison and all the doors flew open (Acts 16)" },
      { q: "Who baptized Paul (then Saul) after he was blinded on the road to Damascus?", a: "Ananias (Acts 9:17-18)" },
      { q: "The Jerusalem Council in Acts 15 resolved a huge debate about Gentile converts. What was the central question they debated?", a: "Whether Gentiles had to be circumcised and follow the Law of Moses to be saved", d: ["Whether Gentile converts should be rebaptized using the Hebrew name for Jesus rather than the Greek form","Whether Gentile believers should be required to learn Hebrew in order to study the scriptures","Whether Gentile churches should be financially separate from the Jewish mother church in Jerusalem"] },
      { q: "Paul and Barnabas split up before their second missionary journey over a disagreement about John Mark. Who did Paul choose as his new traveling companion?", a: "Silas (Acts 15:40)" },
      { q: "In Philippi, Paul cast out a spirit from a slave girl who was making her owners rich. What spirit did she have?", a: "A spirit of divination / fortune-telling (Acts 16:16-18)" },
      { q: "The Philippian jailer was about to kill himself after the earthquake opened all the doors. What did Paul shout to stop him?", a: "'Don't harm yourself! We are all here!' (Acts 16:28)", d: ["'We are servants of God — do not fear, for He sent this earthquake to free us!'","'God sees what you are about to do — put the sword down and call for your family'","'Wait! The chains are loose but we have chosen to stay — come and we will explain why'"] },
      { q: "Paul's traveling companion Luke is unique among New Testament authors. What is his distinction?", a: "He is the only Gentile author in the New Testament" },
      { q: "Agabus was a prophet in the early church who gave Paul a dramatic warning. What did he do to deliver the prophecy?", a: "He tied his own hands and feet with Paul's belt to show Paul would be bound by the Jews (Acts 21:11)", d: ["He drew a map of Paul's journey in the dust and crossed out Jerusalem with an X to warn him","He placed ashes on Paul's head and wept, warning him that Jerusalem would reject him","He spoke in an unknown tongue for an hour and then announced that Paul would face a court trial"] },
      { q: "The early church in Jerusalem sent out Barnabas to investigate the new church forming in Antioch. What did Barnabas do when he arrived?", a: "He rejoiced, encouraged them, then went to Tarsus to find Paul and bring him back (Acts 11:23-25)", d: ["He tested their doctrinal knowledge for three days and then sent a written report to Jerusalem","He appointed elders for the Antioch church and organized a collection for the Jerusalem poor","He preached for a full year in Antioch alone before sending for a team of helpers from Jerusalem"] },
    ],
    1000: [
      { q: "What was the name of the city where followers of Jesus were first called 'Christians'?", a: "Antioch (Acts 11:26)" },
      { q: "Paul was shipwrecked on which island while being transported to Rome as a prisoner?", a: "Malta (Acts 28)" },
      { q: "What problem in the early Jerusalem church led to the appointment of the first seven deacons?", a: "Greek-speaking widows were being overlooked in the daily food distribution (Acts 6)", d: ["Disputes over who should lead worship and teach on the Sabbath caused division in the church","False teachers were entering the church and the apostles needed more time to handle them","The rapid growth made it impossible for the twelve apostles to visit and teach every house church"] },
      { q: "Before his conversion, Paul (Saul) had official letters from whom authorizing him to arrest Christians in Damascus?", a: "The high priest (Acts 9:1-2)", d: ["The Roman governor of Judea — Pontius Pilate's replacement","The Sanhedrin council — all 71 elders signed the authorization letters","King Herod Agrippa — he personally commissioned Saul to suppress the movement"] },
      { q: "Paul spent three missionary journeys planting churches. Name the city he always started from as his sending base.", a: "Antioch (Acts 13:1-3)", d: ["Jerusalem (where the mother church commissioned all missionary activity)","Caesarea (the main port city and base of Roman administration in Judea)","Damascus (where Paul was first baptized and began preaching after his conversion)"] },
      { q: "When Paul appeared before King Agrippa II, the king said something famous. What was it?", a: "'Do you think that in such a short time you can persuade me to be a Christian?' (Acts 26:28)", d: ["'I find nothing wrong with this man — he should have been set free long ago' (Acts 26:31)","'Take him away and let him speak to Caesar — I will hear no more of this matter' (Acts 26:32)","'Guards, take him back to the prison — this man is clearly a dangerous revolutionary' (Acts 26)"] },
      { q: "The seven deacons chosen in Acts 6 were appointed to a specific task so the apostles could keep focusing on prayer and teaching. What was that task?", a: "Distributing food and waiting on tables for the widows (Acts 6:1-3)", d: ["Collecting offerings from the wealthier members and distributing them to the poorer churches","Keeping records of church membership and baptisms so the apostles could track church growth","Guarding the meeting places and handling security during persecutions and raids"] },
      { q: "Paul's letter to the Romans was written from which city, according to most scholars?", a: "Corinth (during his third missionary journey)", d: ["Ephesus (his longest stay on any missionary journey)","Antioch (his sending base for all three missionary journeys)","Philippi (his first European church plant)"] },
      { q: "In what city did Paul reason from the scriptures in the synagogue for 18 months — and Aquila, Priscilla, and Apollos all connect to this city?", a: "Corinth (Acts 18)", d: ["Ephesus (Acts 19)","Thessalonica (Acts 17)","Athens (Acts 17)"] },
      { q: "When Peter healed Tabitha (Dorcas) in Joppa and raised her from the dead, what specific thing did he do just before she opened her eyes?", a: "He put everyone out of the room, knelt and prayed, then said 'Tabitha, get up' (Acts 9:40)", d: ["He anointed her forehead with oil and held both her hands until color returned to her face","He laid his cloak over her and commanded the spirit of death to leave in Jesus' name","He quoted Elijah's prayer from 1 Kings and stretched himself over her body three times"] },
    ],
  },
  "Prophets": {
    200: [
      { q: "This prophet said to God: 'I am only a child — I do not know how to speak.'", a: "Jeremiah (Jeremiah 1:6)" },
      { q: "This prophet was taken up to heaven in a chariot of fire without ever dying.", a: "Elijah (2 Kings 2)" },
      { q: "This prophet spent three days inside a great fish before being sent to preach in Nineveh.", a: "Jonah" },
      { q: "This prophet's name means 'salvation of the Lord' and his book contains the most prophecies about Jesus.", a: "Isaiah" },
      { q: "God gave this prophet four visions involving bizarre creatures with four faces and four wings.", a: "Ezekiel" },
      { q: "This prophet was thrown into a lions' den for praying to God and was miraculously protected.", a: "Daniel" },
      { q: "This prophet ran from God, but God used a giant fish to redirect him back to his mission.", a: "Jonah" },
      { q: "This prophet called down fire from heaven in a contest against 450 false prophets of Baal.", a: "Elijah" },
      { q: "Elijah was depressed under a juniper tree and wanted to die. Who woke him up to feed him?", a: "An angel of the Lord (1 Kings 19:5)" },
      { q: "This young prophet-in-training poured oil on a military commander's head to anoint him king of Israel.", a: "One of Elisha's company of prophets (2 Kings 9:1-6)" },
    ],
    400: [
      { q: "This prophet had a vision of a valley full of dry bones that came back to life as a mighty army.", a: "Ezekiel (Ezekiel 37)" },
      { q: "God told this prophet to marry an unfaithful woman as a living picture of Israel's unfaithfulness to God.", a: "Hosea" },
      { q: "This prophet saw a vision of God seated on a high throne, surrounded by six-winged seraphim crying 'Holy, holy, holy.'", a: "Isaiah (Isaiah 6)" },
      { q: "This prophet wept so much over Israel's sin and destruction that he is called 'the weeping prophet.'", a: "Jeremiah" },
      { q: "This minor prophet predicted that God would send locusts as judgment — and his book calls people to return to God with fasting and prayer.", a: "Joel" },
      { q: "This prophet was told by God to go to Nineveh, ran the opposite direction to Tarshish, and ended up in the belly of a fish.", a: "Jonah" },
      { q: "Isaiah prophesied that a virgin would conceive and give birth to a son called 'Immanuel.' What does Immanuel mean?", a: "God with us (Isaiah 7:14)" },
      { q: "This prophet received his call when he saw a vision of the Lord and said 'I am ruined! I am a man of unclean lips.'", a: "Isaiah (Isaiah 6:5)" },
      { q: "This prophet wrote down Israel's sins and corruption in his book — including the famous 'they have forsaken Me, the spring of living water.'", a: "Jeremiah (Jeremiah 2:13)" },
      { q: "John the Baptist is considered the 'Elijah' who was promised to come. In which Old Testament book is this promise found?", a: "Malachi (Malachi 4:5)" },
    ],
    600: [
      { q: "This prophet foretold the exact birthplace of the Messiah 700 years before Jesus was born.", a: "Micah (Micah 5:2)" },
      { q: "Isaiah 53:7 says the suffering servant was 'led like a lamb to the slaughter.' What does the verse say he was like when sheared — referring to his silence before accusers?", a: "A silent sheep (he did not open his mouth)" },
      { q: "God told this prophet to eat a scroll that tasted sweet as honey in his mouth, then go speak to Israel.", a: "Ezekiel (Ezekiel 3)" },
      { q: "Jonah finally obeyed God and preached in Nineveh. What was the surprising result?", a: "The entire city — from king to commoner — repented and fasted in sackcloth", d: ["The people laughed at Jonah and threw him out of the city gates in disgrace","Half the city believed and the other half tried to stone Jonah in the marketplace","Only the king believed, but the people refused to repent and God destroyed the city anyway"] },
      { q: "God told this prophet to buy a linen belt, wear it, then bury it by the Euphrates River. When he dug it up later, it was ruined — a picture of Israel's ruined pride.", a: "Jeremiah (Jeremiah 13)" },
      { q: "This prophet had a vision of 'the handwriting on the wall' during a feast — and was the only one who could interpret it.", a: "Daniel (Daniel 5)" },
      { q: "Elijah defeated 450 prophets of Baal at Mount Carmel, but then fled in fear from whom?", a: "Queen Jezebel (1 Kings 19:3)" },
      { q: "Which prophet foretold that the Messiah would enter Jerusalem riding on a donkey?", a: "Zechariah (Zechariah 9:9)" },
      { q: "This prophet predicted that 'the Lord whom you seek will suddenly come to His temple' — written about 400 years before Jesus cleansed the temple.", a: "Malachi (Malachi 3:1)" },
      { q: "Daniel correctly interpreted Nebuchadnezzar's dream of a statue. What did the stone not cut by human hands represent in that vision?", a: "God's eternal kingdom that would crush all earthly kingdoms (Daniel 2:44-45)", d: ["The coming Messiah who would be born without human fatherhood to save the Jewish people","The nation of Israel that would be rebuilt and last forever after the exile ended","The angel armies of heaven that would fight for Babylon and make it the eternal empire"] },
    ],
    800: [
      { q: "Jonah preached in this wicked Assyrian capital city — and the entire population repented in sackcloth.", a: "Nineveh" },
      { q: "Daniel interpreted a terrifying dream for this king — a statue made of gold, silver, bronze, iron, and clay.", a: "King Nebuchadnezzar (Daniel 2)" },
      { q: "God commanded this prophet to walk barefoot and without clothes for three years as a sign to Egypt and Ethiopia.", a: "Isaiah (Isaiah 20:3)" },
      { q: "The prophet Amos was not a professional prophet — what was his actual occupation when God called him?", a: "He was a shepherd and a fig-tree farmer (Amos 7:14)" },
      { q: "This prophet complained to God 'How long, Lord, must I call for help but you do not listen? Why do you make me look at injustice?' — and God told him 'The just shall live by faith.'", a: "Habakkuk" },
      { q: "Elisha made an ax head float, healed Naaman's leprosy, and fed 100 men with 20 loaves. How many miracles are recorded of Elisha compared to Elijah?", a: "Twice as many miracles as Elijah (the double portion he requested)" },
      { q: "This prophet in Jeremiah's day was put in stocks outside the temple for his prophecy — but kept preaching. He later wrote a book of sorrowful poetry.", a: "Jeremiah (and the book of Lamentations)" },
      { q: "In the vision of the dry bones in Ezekiel 37, what did the bones represent?", a: "The nation of Israel in exile — spiritually dead but destined for restoration (Ezekiel 37:11)", d: ["The bodies of the Israelites who died in battle against Babylon — God promised their descendants would rise again","The individual souls of every person who had rejected God — to be judged at the end of the age","The Gentile nations surrounding Israel — God warning them that their kingdoms would be destroyed"] },
      { q: "Which prophet gave the famous prophecy 'A shoot will come up from the stump of Jesse; from his roots a Branch will bear fruit' — a prophecy about Jesus?", a: "Isaiah (Isaiah 11:1)" },
      { q: "In one of Zechariah's night visions, a gold lampstand stands between two olive trees. God delivers a famous encouragement to Zerubbabel through this vision. What does God say?", a: "'Not by might nor by power, but by my Spirit,' says the Lord (Zechariah 4:6)", d: ["'Though the mountain before you seems great, I will make it a plain before my servant' (Zechariah 4:7)","'My eyes range throughout the earth to strengthen those whose hearts are fully committed to me' (2 Chronicles 16:9)","'Do not be afraid, for I am with you; be not dismayed, for I am your God' (Isaiah 41:10)"] },
    ],
    1000: [
      { q: "This is traditionally considered the last Old Testament prophet, and his book ends the OT with a promise about Elijah's return.", a: "Malachi" },
      { q: "Before he ascended, Elijah asked Elisha what he wanted. What was Elisha's bold request?", a: "A double portion of Elijah's spirit (2 Kings 2:9)" },
      { q: "Which minor prophet foretold that the Messiah would be called out of Egypt — fulfilled when Mary and Joseph fled there with Jesus?", a: "Hosea (Hosea 11:1, quoted in Matthew 2:15)" },
      { q: "The book of Daniel was written in two languages. What are they?", a: "Hebrew and Aramaic (chapters 2-7 are in Aramaic)", d: ["Hebrew and Greek (Daniel translated portions into Greek for the Babylonian court)","Aramaic and Babylonian (written entirely for an audience in the Babylonian Empire)","Hebrew and Persian (the later chapters were written under Persian King Darius)"] },
      { q: "Jeremiah was forbidden by God from doing two normal life things as a sign to the people. What were they?", a: "He was told not to marry and not to attend funerals or feasts (Jeremiah 16:1-8)", d: ["He was told not to own property and not to work with his hands for wages","He was told not to cut his hair and not to wear sandals while delivering God's messages","He was told not to eat meat and not to drink wine during his years of prophetic ministry"] },
      { q: "Ezekiel saw four living creatures with four faces each. Name all four faces.", a: "Human, lion, ox, and eagle (Ezekiel 1:10)", d: ["Lion, bear, leopard, and beast with iron teeth (Daniel 7:3-7)","Eagle, ox, dove, and serpent (representing the four directions of the earth)","Angel, cherub, seraph, and wheel within a wheel (the four orders of heavenly beings)"] },
      { q: "Which prophet foretold that Israel's king would come 'riding on a donkey, on a colt, the foal of a donkey' — 500 years before Palm Sunday?", a: "Zechariah (Zechariah 9:9)" },
      { q: "The prophet Hosea named his three children as symbolic messages to Israel. What were their names?", a: "Jezreel, Lo-Ruhamah, and Lo-Ammi (Hosea 1)", d: ["Shear-Jashub, Maher-Shalal-Hash-Baz, and Immanuel (Isaiah's symbolic children)","Emmanuel, Salvation, and Remnant (symbolic names Hosea gave his three daughters)","Babylon, Nineveh, and Egypt (named after the nations that threatened Israel)"] },
      { q: "Isaiah 53:5 says 'by His wounds we are healed.' What does the verse say Jesus was, for our transgressions and iniquities?", a: "Pierced and crushed (Isaiah 53:5)", d: ["Despised and rejected (Isaiah 53:3)","Flogged and mocked (Isaiah 53:4)","Lifted up and glorified (Isaiah 52:13)"] },
      { q: "Two figures appeared with Jesus on the Mount of Transfiguration, one representing the Law and one representing the Prophets. Which figure represented the Prophets?", a: "Elijah (Matthew 17:3)" },
    ],
  },
  "Psalms & Proverbs": {
    200: [
      { q: "Which Psalm begins with 'The Lord is my shepherd; I shall not want'?", a: "Psalm 23" },
      { q: "Proverbs 3:5 says 'Trust in the Lord with all your heart and lean not on your own ___.' Fill in the blank.", a: "Understanding" },
      { q: "Complete this Psalm: 'This is the day the Lord has made; let us _____ and be glad in it.'", a: "Rejoice (Psalm 118:24)" },
      { q: "Proverbs 3:6 says 'In all your ways acknowledge Him, and He shall _____ your paths.' Fill in the blank.", a: "Direct" },
      { q: "Psalm 46:10 says 'Be _____, and know that I am God.' Fill in the blank.", a: "Still" },
      { q: "Proverbs 22:6 says 'Train up a child in the way he should go, and when he is old he will not _____.'", a: "Depart from it" },
      { q: "Which Psalm says 'I will lift up my eyes to the hills — from whence comes my help'?", a: "Psalm 121" },
      { q: "Psalm 100 calls us to 'Enter His gates with _____.' Fill in the blank.", a: "Thanksgiving" },
      { q: "Proverbs 18:21 says 'Death and life are in the power of the _____.'", a: "Tongue" },
      { q: "Psalm 23 says 'Yea, though I walk through the valley of the shadow of death, I will fear no evil, for You are _____.'", a: "With me" },
    ],
    400: [
      { q: "Psalm 119 is the longest chapter in the Bible. What subject does every single verse reference?", a: "God's Word (His law)" },
      { q: "Proverbs 22:6 says 'Train up a child in the way he should go, and when he is old he will not do what?'", a: "Depart from it" },
      { q: "Psalm 100 says 'Enter His gates with _____ and His courts with praise.' Fill in the blank.", a: "Thanksgiving" },
      { q: "Proverbs 4:23 says 'Above all else, guard your _____, for everything you do flows from it.'", a: "Heart" },
      { q: "Which Psalm begins 'The earth is the Lord's, and everything in it, the world, and all who live in it'?", a: "Psalm 24" },
      { q: "Proverbs says 'A friend loves at all times, and a brother is born for a time of _____.'", a: "Adversity (Proverbs 17:17)" },
      { q: "Psalm 119:11 says 'I have hidden your word in my heart that I might not _____ against you.'", a: "Sin" },
      { q: "Proverbs 27:17 says 'As iron sharpens iron, so one person _____ another.'", a: "Sharpens" },
      { q: "Psalm 139 says God knew you before you were born and that you are 'fearfully and _____ made.'", a: "Wonderfully" },
      { q: "Proverbs 16:9 says 'In their hearts humans plan their course, but the Lord _____ their steps.'", a: "Establishes" },
    ],
    600: [
      { q: "Psalm 22 begins with the same words Jesus cried out on the cross. What are those words?", a: "\"My God, my God, why have you forsaken me?\"" },
      { q: "Proverbs 16:18 says 'Pride goes before destruction, and a _____ spirit before a fall.' Fill in the blank.", a: "Haughty" },
      { q: "David wrote Psalm 51 as a prayer of repentance after which specific sin?", a: "His adultery with Bathsheba and the murder of her husband Uriah", d: ["His failure to seek God before moving the Ark of the Covenant (2 Samuel 6)","His disobedience in taking a military census of Israel (2 Samuel 24)","His failure to discipline his son Amnon after he violated his daughter Tamar (2 Samuel 13)"] },
      { q: "Psalm 23 says 'You prepare a table before me in the presence of my _____.' Fill in the blank.", a: "Enemies" },
      { q: "Which Psalm is known as the 'midnight Psalm' — opening with 'Out of the depths I cry to you, Lord'?", a: "Psalm 130" },
      { q: "Proverbs 31:25 says a virtuous woman is clothed with strength and _____ and she laughs without fear of the future.", a: "Dignity" },
      { q: "Psalm 1 says the blessed person is 'like a tree planted by _____ of water, which yields its fruit in season.'", a: "Streams" },
      { q: "Proverbs 11:2 says 'When pride comes, then comes _____; but with humility comes wisdom.'", a: "Disgrace" },
      { q: "Psalm 51:10 is a prayer David prayed. What two things does he ask God to create and renew?", a: "A clean heart and a right spirit (Psalm 51:10)", d: ["A contrite spirit and a broken heart (Psalm 51:17)","A joyful soul and a faithful mouth (Psalm 51:14-15)","A willing mind and an obedient will (Psalm 51:12)"] },
      { q: "Proverbs 14:12 says 'There is a way that appears to be right, but in the end it ___.'", a: "Leads to death (Proverbs 14:12)" },
    ],
    800: [
      { q: "Proverbs 4:23 says 'Above all else, guard your _____, for everything you do flows from it.'", a: "Heart" },
      { q: "In Psalm 46:10, what does God say to do — and then know that He is God?", a: "Be still (\"Be still, and know that I am God\")" },
      { q: "Proverbs 27:17 says 'As iron sharpens iron, so one person _____ another.' Fill in the blank.", a: "Sharpens" },
      { q: "Psalm 22:18 contains a specific prophecy fulfilled at the crucifixion about soldiers and Jesus' clothing. What did it predict?", a: "Soldiers would divide his garments and cast lots for his clothing" },
      { q: "Psalm 139:13 says 'You created my inmost being; You _____ me in my mother's womb.'", a: "Knit together", d: ["Fashioned","Formed","Breathed life into"] },
      { q: "Proverbs 31 lists the qualities of a virtuous woman. According to verse 30, what two things are fleeting and deceptive?", a: "Charm is deceptive and beauty is fleeting (Proverbs 31:30)", d: ["Wealth is uncertain and power is unstable (Proverbs 31:30)","Intelligence is partial and strength is temporary (Proverbs 31:30)","Youth is brief and reputation is fragile (Proverbs 31:30)"] },
      { q: "Psalm 8:2 says 'Through the praise of children and infants You have established a stronghold.' Jesus quoted this verse in what situation?", a: "When children were shouting 'Hosanna' in the temple and the leaders objected (Matthew 21:16)", d: ["When the disciples argued about who would be the greatest in the kingdom (Matthew 18:1-4)","When people brought little children to Jesus and the disciples tried to turn them away (Matthew 19:13-14)","When Jesus told the Pharisees that if the people were silent, the stones would cry out (Luke 19:40)"] },
      { q: "Proverbs 3:9-10 says 'Honor the Lord with your wealth, with the firstfruits of all your crops; then your _____.' Complete the verse.", a: "'Then your barns will be filled to overflowing, and your vats will brim over with new wine'", d: ["'Then your enemies will be driven out and your household will find peace'","'Then your name will be blessed and your children will rise up and call you worthy'","'Then your labor will not be in vain and the fruit of your hands will be multiplied'"] },
      { q: "Which Psalm did Jesus quote from the cross? And what is unique about this Psalm's ending compared to its dark opening?", a: "Psalm 22 — it opens in despair but ends in praise and victory", d: ["Psalm 69 — it opens with drowning imagery but ends with God restoring Zion","Psalm 31 — it opens with desperate refuge-seeking but ends in confident trust","Psalm 88 — uniquely it opens in despair and closes in despair, unlike all other lament psalms"] },
      { q: "Proverbs 19:11 says 'A person's wisdom yields patience; it is to one's glory to _____ an offense.'", a: "Overlook" },
    ],
    1000: [
      { q: "How many Psalms in the Bible are traditionally attributed to King David?", a: "73 Psalms" },
      { q: "Psalm 119 is the longest chapter in the entire Bible. How many verses does it have?", a: "176 verses" },
      { q: "Psalm 22:18 contains a prophecy fulfilled at the crucifixion. What does it say soldiers would do with the author's clothing?", a: "They would divide his garments and cast lots for his clothing" },
      { q: "Psalm 119 is structured as an acrostic — what does that mean and how many sections does it have?", a: "22 sections, each beginning with a successive letter of the Hebrew alphabet", d: ["22 sections, each written in a different poetic meter to represent the 22 gates of Jerusalem","176 verses arranged in 8-verse stanzas, where each stanza rhymes and tells a connected story","Each verse begins with the same Hebrew word for 'blessed,' creating a recurring refrain throughout"] },
      { q: "Besides Solomon, chapter 30 of Proverbs was written by a man described only as 'the son of Jakeh.' What was his name?", a: "Agur", d: ["Lemuel","Hezekiah","Ethan"] },
      { q: "Which Psalm is quoted more in the New Testament than any other Old Testament passage?", a: "Psalm 110", d: ["Psalm 22","Psalm 118","Psalm 2"] },
      { q: "Psalm 22 begins 'My God, my God, why have you forsaken me' — Jesus quoted this on the cross. According to verse 24, what did God NOT do to the suffering one?", a: "He did not despise or ignore the suffering — He listened to the afflicted one's cry (Psalm 22:24)", d: ["He did not turn back the suffering early — God allowed the full weight of the affliction to fall","He did not delay His answer — God responded immediately the moment the prayer was prayed","He did not require the sufferer to prove worthiness before He was willing to hear the prayer"] },
      { q: "The shortest chapter in the Bible has only 2 verses. What chapter is it?", a: "Psalm 117", d: ["Psalm 100","Psalm 133","Psalm 150"] },
      { q: "Proverbs 25:2 says 'It is the glory of God to _____ a matter; it is the glory of kings to search out a matter.'", a: "Conceal", d: ["Reveal","Establish","Judge"] },
      { q: "The Psalms are divided into 5 books, mirroring the 5 books of Moses. Which Psalm marks the beginning of Book 4?", a: "Psalm 90 (written by Moses)", d: ["Psalm 73 (beginning of Book 3, attributed to Asaph)","Psalm 107 (beginning of Book 5, a thanksgiving psalm)","Psalm 42 (beginning of Book 2, a psalm of the sons of Korah)"] },
    ],
  },
  "Creation & Genesis": {
    200: [
      { q: "On which day of creation did God make human beings?", a: "Day 6" },
      { q: "What was the sign of God's covenant with Noah after the flood?", a: "A rainbow" },
      { q: "What was the name of the garden where Adam and Eve first lived?", a: "The Garden of Eden" },
      { q: "What were the names of Adam and Eve's first two sons?", a: "Cain and Abel" },
      { q: "What part of Adam's body did God use to create Eve?", a: "A rib" },
      { q: "God created the world in 6 days. What did He do on day 7?", a: "He rested (and blessed and hallowed that day)" },
      { q: "What did the serpent tempt Eve to eat in the Garden of Eden?", a: "Fruit from the Tree of the Knowledge of Good and Evil" },
      { q: "What did God create on Day 1 of creation?", a: "Light (and He separated it from darkness)" },
      { q: "What question did God ask Adam after he sinned in the garden?", a: "'Where are you?' (Genesis 3:9)" },
      { q: "Why did God confuse the language of the people building the Tower of Babel?", a: "Because united in one language, nothing they planned to do would be impossible for them (Genesis 11:6)" },
    ],
    400: [
      { q: "What were the names of Adam and Eve's first two sons?", a: "Cain and Abel" },
      { q: "God confused the languages of humanity at this famous unfinished structure.", a: "The Tower of Babel" },
      { q: "What part of Adam's body did God use to create Eve?", a: "A rib" },
      { q: "God promised Abram that his descendants would be as numerous as what two things?", a: "The stars in the sky and the sand on the seashore (Genesis 15:5, 22:17)" },
      { q: "Jacob and Esau were twins — but which one was born first?", a: "Esau (with Jacob grabbing his heel, Genesis 25:25-26)" },
      { q: "Joseph had a coat of many colors given to him by his father. Who was Joseph's father?", a: "Jacob (Israel)" },
      { q: "When God called Abram to leave his country, how old was Abram at the time?", a: "75 years old (Genesis 12:4)" },
      { q: "What did God use to cover Adam and Eve's nakedness after they sinned — replacing their fig leaves?", a: "Garments of animal skin (Genesis 3:21)" },
      { q: "Joseph's brothers dipped his coat in goat's blood and took it to their father. What did Jacob conclude?", a: "That a wild animal had killed Joseph" },
      { q: "Isaac's wife Rebekah gave birth to twins. She was told by God that 'the older shall serve the _____.'", a: "Younger (Genesis 25:23)" },
    ],
    600: [
      { q: "When Abraham raised the knife to sacrifice his son Isaac, what did God provide as the substitute offering?", a: "A ram caught in a thicket nearby (Genesis 22:13)" },
      { q: "What were the names of the two special trees in the middle of the Garden of Eden?", a: "The Tree of Life and the Tree of the Knowledge of Good and Evil" },
      { q: "How old was Abraham when his son Isaac was born?", a: "100 years old (Genesis 21:5)" },
      { q: "Jacob tricked his father Isaac into giving him the blessing intended for his brother Esau. What did Jacob use to make his smooth skin feel hairy?", a: "Goatskin on his hands and neck (Genesis 27:16)" },
      { q: "Joseph was given the ability to do what — which eventually led to his rise in Egypt?", a: "Interpret dreams" },
      { q: "When Joseph revealed himself to his brothers, he said God had sent him ahead for a purpose. What did he say that purpose was?", a: "To save lives (Genesis 45:7)", d: ["To fulfill the dreams God gave him as a boy (Genesis 45:7)","To preserve the line of Judah through which the Messiah would come","To show Pharaoh that God's wisdom was greater than all Egypt's wise men"] },
      { q: "What two angels visited Sodom before God destroyed it, and who was their first stop?", a: "Two angels — they went first to Lot's house (Genesis 19:1)", d: ["Three angels — they first went to the city gate to speak with the elders of Sodom","Two angels — they first appeared in the public square to warn anyone who would listen","One angel and the Lord Himself — they went first to Abraham before going to Sodom"] },
      { q: "God changed Jacob's name to Israel after he wrestled all night. What does the name Israel mean?", a: "He struggles with God (Genesis 32:28)", d: ["God's chosen one (reflecting Jacob's election as heir of the covenant)","Prince of peace (a title of honor given by the angel after the match ended)","Heir of the promise (meaning Jacob had inherited the full covenant from Abraham and Isaac)"] },
      { q: "After the flood, what was the first thing Noah did when he stepped off the ark?", a: "He built an altar and offered burnt offerings to God (Genesis 8:20)", d: ["He knelt and prayed a prayer of thanksgiving for every member of his family","He planted a vineyard — the very first act recorded after he left the ark","He surveyed the land and chose the best location to build a new city for his family"] },
      { q: "God made a covenant with Noah. What was the one condition God stated for all of humanity going forward?", a: "Not to murder, because humans are made in God's image (Genesis 9:6)", d: ["Not to eat blood, because life is in the blood and belongs only to God (Genesis 9:4)","Not to worship idols, because God alone brought them through the flood to safety","Not to intermarry with ungodly peoples, because they must maintain a holy line"] },
    ],
    800: [
      { q: "God changed Abram's name to Abraham. What does the name Abraham mean?", a: "Father of many nations" },
      { q: "Joseph interpreted two dreams in prison for two of Pharaoh's officials. What were their job titles?", a: "The cupbearer (butler) and the baker", d: ["The captain of the guard and the royal treasurer","The head scribe and the chief steward of the palace","The chariot master and the royal physician"] },
      { q: "Lot's wife disobeyed the angel's command and looked back at Sodom. What happened to her?", a: "She turned into a pillar of salt (Genesis 19:26)" },
      { q: "One of Jacob's 12 sons became the ancestor of the priestly tribe, set apart to serve in the tabernacle and temple. Which son was it?", a: "Levi (the Levites)" },
      { q: "Joseph interpreted Pharaoh's dream of 7 fat cows and 7 thin cows. What did he say would happen?", a: "7 years of abundance followed by 7 years of famine (Genesis 41:25-30)", d: ["7 years of peace followed by 7 years of war with Egypt's neighboring nations","7 years of rain followed by 7 years of drought across the whole Mediterranean region","7 good harvests followed by 7 plagues against Egypt and the surrounding lands"] },
      { q: "God told Abraham to leave 'Ur of the Chaldeans.' In which modern-day country is the ancient site of Ur located?", a: "Iraq (Mesopotamia — between the Tigris and Euphrates rivers)", d: ["Turkey (where Abraham's family settled in Haran before moving to Canaan)","Iran (on the eastern edge of the Fertile Crescent near the Persian mountains)","Saudi Arabia (in the northwestern Arabian Peninsula near the trade routes)"] },
      { q: "Esau traded his birthright to Jacob for something very simple. What was it?", a: "A bowl of red lentil stew (Genesis 25:33)" },
      { q: "How many of each kind of animal did Noah take on the ark — and is it 2 of every kind, or does it vary?", a: "2 of every unclean animal, but 7 pairs (14) of every clean animal (Genesis 7:2-3)", d: ["2 of every kind of every animal — Genesis 6:19 is clear that it was always one pair each","7 of every kind — God told Noah to take 7 of each animal so there were enough for offerings","2 of unclean animals and 2 of clean animals — the 7-pair rule only applies to birds"] },
      { q: "What were the four rivers said to flow from the Garden of Eden?", a: "Pishon, Gihon, Tigris (Hiddekel), and Euphrates (Genesis 2:11-14)", d: ["Jordan, Nile, Euphrates, and Abana (the four rivers connecting the ancient world)","Tigris, Euphrates, Jordan, and Jabbok (the rivers most associated with biblical events)","Gihon, Nile, Kishon, and Abana (the four rivers that flowed around ancient Canaan)"] },
      { q: "When God rejected Cain's offering but accepted Abel's, what did God say to Cain to warn him?", a: "'Sin is crouching at your door; it desires to have you, but you must rule over it' (Genesis 4:7)", d: ["'Your brother's blood cries out to me from the ground — you have done a terrible thing'","'Why are you angry? If you had done what is right, would you not have been accepted?'","'You have chosen the way of death — your sacrifice was rejected because your heart was proud'"] },
    ],
    1000: [
      { q: "How many chapters are in the book of Genesis?", a: "50 chapters" },
      { q: "God destroyed two wicked cities in Genesis. Name both of them.", a: "Sodom and Gomorrah" },
      { q: "Before being called by God, Abraham's father Terah set out for Canaan but stopped and settled in a different city. Which city?", a: "Haran (Genesis 11:31)" },
      { q: "Genesis 1:1 begins 'In the beginning, God created...' — what Hebrew word is used for God in that verse, and why is it significant?", a: "'Elohim' — it is a plural form, hinting at the Trinity from the very first verse", d: ["'Yahweh' — the personal covenant name of God, emphasizing His relationship with humanity","'Adonai' — meaning 'Lord and Master,' showing God's authority over all creation from the start","'El Shaddai' — meaning 'God Almighty,' used to emphasize His unlimited power as Creator"] },
      { q: "What was the significance of Abraham's covenant with God in Genesis 15 — and what unusual ritual confirmed it?", a: "God alone passed between the cut animal halves (as a smoking firepot) — binding only Himself to the promise (Genesis 15:17)", d: ["Both Abraham and God walked through the cut animals together, both pledging their lives to the covenant","Abraham was told to sacrifice the animals and burn them completely as a sign that the old life was ended","God appeared as a pillar of fire and spoke His promises to Abraham while he remained motionless in a deep sleep"] },
      { q: "In Joseph's story, the cupbearer forgot Joseph for 2 years. What happened that finally got Joseph out of prison?", a: "Pharaoh had two disturbing dreams that none of his wise men could interpret, and the cupbearer finally remembered Joseph", d: ["Potiphar's wife confessed that she had lied about Joseph, and Pharaoh ordered his release","The chief jailer came to Pharaoh and told him about Joseph's gift of interpretation after 2 years","God sent an angel to Pharaoh in a dream who told him the name of the man who could interpret it"] },
      { q: "The genealogy in Genesis 5 traces from Adam to Noah. What is the theological significance of the meaning of all 10 names in order?", a: "They form a sentence: 'Man appointed mortal sorrow; the Blessed God shall come down, teaching that His death shall bring the despairing rest'", d: ["Each name's meaning traces the fall of creation from perfect rest to exile and waiting for restoration","The names collectively form a prayer of mourning — ancient readers would have known this by heart","The 10 names mirror the 10 plagues of Egypt, showing God's judgment theme throughout Genesis"] },
      { q: "God told Abraham 'In your seed all the nations of the earth shall be blessed.' The apostle Paul quotes this in Galatians. What does he say 'seed' (singular) means?", a: "Christ — the blessing came through one descendant, Jesus (Galatians 3:16)", d: ["Israel — the nation descended from Abraham through whom the Law was given to the world","The church — all believers together who are the spiritual seed of Abraham by faith","The Levites — the priestly line through which the temple worship blessed all the nations"] },
      { q: "What did God say was not good in Genesis 2 — before Eve was created?", a: "'It is not good for man to be alone' (Genesis 2:18)", d: ["'It is not good for man to have no work' — so God gave Adam the task of naming the animals","'It is not good for man to remain in the garden' — so God planned to send him into the earth","'It is not good for man to live without dominion' — so God made the animals subject to him"] },
      { q: "Genesis 3:15 is called the 'protoevangelium' — the first gospel. What does it say the 'seed of the woman' will do to the serpent?", a: "Crush the serpent's head (Genesis 3:15)", d: ["Bind the serpent and cast it into the abyss never to deceive again (Revelation 20:2)","Overcome the serpent through patience and suffering rather than by force (Romans 16:20)","Strike the serpent's tail so that it will no longer be able to attack without warning (Genesis 3:15)"] },
    ],
  },
  "Kings & Kingdoms": {
    200: [
      { q: "Who defeated the giant Goliath with a sling and a stone?", a: "David" },
      { q: "Who was the first king of Israel?", a: "King Saul" },
      { q: "Which king built the first temple in Jerusalem?", a: "Solomon" },
      { q: "King Nebuchadnezzar was the king of which powerful empire?", a: "Babylon" },
      { q: "Which kingdom conquered Israel and took many Jews into exile around 605 BC?", a: "Babylon" },
      { q: "David was a shepherd before becoming king. In which city was he born?", a: "Bethlehem" },
      { q: "Solomon was known as the wisest man who ever lived. What did he ask God for?", a: "Wisdom (1 Kings 3:9)" },
      { q: "This king of Judah sacrificed his own son to pagan gods and led Israel into more wickedness than any nation before him, according to 2 Kings 21.", a: "King Manasseh" },
      { q: "After Saul died, which tribe anointed David as king first before all Israel followed?", a: "Judah (2 Samuel 2:4)" },
      { q: "The Queen of Sheba traveled a great distance to visit which famous king and test him with hard questions?", a: "King Solomon (1 Kings 10)" },
    ],
    400: [
      { q: "King Solomon asked God for wisdom. Name one additional blessing God gave him that he did NOT ask for.", a: "Riches and honor (1 Kings 3:13)" },
      { q: "King Nebuchadnezzar threw three Hebrew men into a fiery furnace. What were all three of their Babylonian names?", a: "Shadrach, Meshach, and Abednego" },
      { q: "The kingdom of Israel split in two after the death of which king?", a: "Solomon" },
      { q: "King David committed two great sins. What were they?", a: "Adultery with Bathsheba and arranging the murder of her husband Uriah", d: ["Pride in counting the people and placing false trust in Israel's military strength","Failing to discipline his children and tolerating injustice in his own household","Marrying foreign wives and allowing idol worship to spread in Jerusalem"] },
      { q: "How did God prove to David through the prophet Nathan that he had sinned? What story did Nathan tell?", a: "He told a parable about a rich man who stole a poor man's only lamb (2 Samuel 12)" },
      { q: "Who was the king of Israel during the time of Elijah and the Mount Carmel showdown?", a: "King Ahab" },
      { q: "King Josiah became king at a very young age. How old was he?", a: "8 years old (2 Kings 22:1)" },
      { q: "Rehoboam was Solomon's son who caused the kingdom to split. What foolish decision triggered the division?", a: "He refused to lighten the people's burden and threatened to make it worse (1 Kings 12:14)" },
      { q: "Which king of the Persians allowed the Jews to return to their homeland and rebuild the temple?", a: "Cyrus the Great (Ezra 1:1-3)" },
      { q: "Which Babylonian king saw a mysterious hand writing on the wall at his feast — and died that very night?", a: "King Belshazzar (Daniel 5)" },
    ],
    600: [
      { q: "After Solomon's death, Israel split into two kingdoms. What were the northern and southern kingdoms called?", a: "Israel (north) and Judah (south)" },
      { q: "Elijah challenged the prophets of Baal on Mount Carmel during the reign of which wicked king?", a: "King Ahab" },
      { q: "This king of Judah found the lost Book of the Law in the temple and wept, then launched sweeping reforms.", a: "Josiah (2 Kings 22)" },
      { q: "Which king sent spies into Canaan and was given the report that it was a land of 'milk and honey' — but the spies were afraid?", a: "Moses (leading Israel) — he wasn't technically a king, but the leader at the time", d: ["Joshua — he was Israel's military leader who sent two spies into Jericho before the conquest","Caleb — he was the one who insisted they could take the land and sent out the exploring party","Samuel — he led Israel during the transition period before the monarchy and organized the scouting party"] },
      { q: "The Assyrian Empire conquered which kingdom first — the northern or southern kingdom?", a: "The northern kingdom of Israel (722 BC, under King Hoshea)" },
      { q: "King Manasseh was the most wicked king of Judah. But he later repented. Where was he when he repented?", a: "In exile, bound in chains in Babylon (2 Chronicles 33:12-13)" },
      { q: "What was the name of the Persian king who was Queen Esther's husband?", a: "Ahasuerus (also called Xerxes I)" },
      { q: "David chose Jerusalem as his capital city. What was it called before he captured it, and who were its inhabitants?", a: "It was called Jebus and was inhabited by the Jebusites (2 Samuel 5:6-7)", d: ["It was called Melchizedek's City, after the priest-king who met Abraham — its last rulers were Canaanites","It was called Salem, a neutral city not assigned to any tribe and occupied by a coalition of Amorites","It was called Moriah, the same mountain Abraham offered Isaac on, ruled by Philistine chiefs"] },
      { q: "Which king of Judah made a bronze snake (like Moses' pole) into an idol — and which later king destroyed it?", a: "Moses made the original; Israel worshipped it; Hezekiah destroyed it and called it 'Nehushtan' (2 Kings 18:4)", d: ["Solomon created the bronze snake to decorate the temple; Josiah melted it down in his reforms","Jeroboam commissioned a bronze snake at Bethel; Josiah destroyed it along with the altar","Rehoboam ordered a bronze serpent carried into battle; Asa destroyed it and banned its worship"] },
      { q: "After Solomon died, his son Rehoboam ruled. What did most of Israel do in response to his harsh rule?", a: "Ten tribes rebelled and made Jeroboam their king, splitting the kingdom (1 Kings 12)", d: ["Nine tribes swore loyalty to Rehoboam but demanded a council of elders have equal authority","All twelve tribes submitted to Rehoboam, but his harsh taxation led to a series of failed revolts","Eleven tribes rallied behind Jeroboam but eventually returned to Rehoboam after a peace treaty"] },
    ],
    800: [
      { q: "Which prophet confronted King David about his sin with Bathsheba by telling him a parable about a stolen lamb?", a: "Nathan the prophet (2 Samuel 12)" },
      { q: "King Hezekiah prayed when he was told he would die from illness. How many extra years did God add to his life?", a: "15 years (Isaiah 38:5)" },
      { q: "What was written on the wall at Belshazzar's feast, and what did the words mean?", a: "Mene, Mene, Tekel, Upharsin — your kingdom is numbered, weighed, and divided (Daniel 5)", d: ["Ichabod, Selah, Amen — 'The glory has departed; God has spoken; it is finished' (1 Samuel 4:21)","Kadesh, Nebo, Pisgah — 'You have journeyed far enough; you will not enter what you sought'","Peres, Gimel, Aleph — 'Babylon's first king was great; his last will bring its end' (Daniel 5)"] },
      { q: "David wanted to build a temple for God, but God said no. Who did God say would build the temple instead?", a: "David's son Solomon (2 Samuel 7:12-13)" },
      { q: "King Ahab wanted a vineyard owned by Naboth. When Naboth refused to sell it, what did Queen Jezebel arrange?", a: "She had false witnesses accuse Naboth of blasphemy, got him stoned to death, and seized the vineyard (1 Kings 21)" },
      { q: "Which king of Judah was taken captive to Babylon as a teenager, along with Daniel and his friends?", a: "Jehoiachin (also called Jeconiah, 2 Kings 24:12)" },
      { q: "The Medo-Persian Empire defeated Babylon the night of Belshazzar's feast. Who was the new king?", a: "Darius the Mede (Daniel 5:31)" },
      { q: "How many chariots and horsemen did Solomon accumulate — showing his wealth but also his disobedience to Deuteronomy 17?", a: "1,400 chariots and 12,000 horsemen (1 Kings 10:26)" },
      { q: "Why did Solomon's heart turn away from God in his old age — and what was the direct result?", a: "His foreign wives turned his heart to their gods; as a result, God tore the kingdom away from his son (1 Kings 11:4-11)", d: ["His immense wealth made him proud; as a result, God sent Assyria against him in his final years","His excessive sacrifices left the temple treasury empty; as a result, the priesthood turned against his rule","His building projects forced heavy labor on the people; as a result, ten tribes rebelled during his lifetime"] },
      { q: "David was not allowed to build the temple. What specific reason did God give — based on David's life of warfare?", a: "David was a man of blood who had shed much blood in war (1 Chronicles 22:8)", d: ["David had not yet conquered all the enemies God specified before temple building could begin","David's son had already been chosen and a temple built too early would dishonor God's plan","David broke the Law of Moses by counting the people, which disqualified him from building"] },
    ],
    1000: [
      { q: "How many kings ruled over the united kingdom of Israel before it split into two?", a: "Three: Saul, David, and Solomon" },
      { q: "Which is the only king in the entire Bible described as 'a man after God's own heart'?", a: "David (1 Samuel 13:14)" },
      { q: "When the Assyrians surrounded Jerusalem and 185,000 of their soldiers were killed overnight, which king of Judah was on the throne?", a: "Hezekiah (2 Kings 19)" },
      { q: "How many kings of Israel (northern kingdom) were righteous — that is, how many 'did what was right in the eyes of the Lord'?", a: "Zero — every single king of the northern kingdom was evil (all 19 kings)" },
      { q: "The Davidic covenant in 2 Samuel 7 is foundational. What did God specifically promise David about his throne?", a: "That his throne would be established forever — ultimately fulfilled in Jesus, the Son of David (2 Samuel 7:16)", d: ["That his son Solomon would be the greatest king in all the earth and would never be overthrown","That the line of David would always rule as long as Israel kept the commandments of the Law","That God would protect Jerusalem from every enemy for as long as the temple stood on the hill"] },
      { q: "King Josiah found the Book of the Law, then consulted a prophetess about what God would do. Who was she and what was her prophecy?", a: "Huldah — she said judgment would still come on Jerusalem but not in Josiah's lifetime (2 Kings 22:14-20)", d: ["Deborah — she said the nation would be spared if Josiah restored temple worship within one year","Miriam — she said God was pleased with Josiah and would extend his reign for thirty more years","Anna — she foretold that the temple would stand for one generation more before destruction came"] },
      { q: "God rejected Saul as king after he disobeyed by sparing the enemy King Agag. Which prophet confronted Saul with the words 'To obey is better than sacrifice'?", a: "Samuel (1 Samuel 15)" },
      { q: "King Nebuchadnezzar was struck with madness by God for 7 years. What caused it, and what happened when he was restored?", a: "His pride claiming he built Babylon by his own power; when restored, he praised God (Daniel 4)", d: ["His command to burn the Hebrew young men; when restored, he rebuilt the furnace as a monument to God","His refusal to release the Jewish captives; when restored, he freed all Israelite slaves in Babylon","His worship of the golden statue; when restored, he issued a decree banning all idol worship in the empire"] },
      { q: "Most kings of Judah were evil, but a handful 'did what was right in the eyes of the Lord.' What did every wicked king of Israel's northern kingdom have in common — without a single exception?", a: "Every single one of the 19 kings of the northern kingdom was evil — none did what was right", d: ["Every king of the northern kingdom was assassinated in office — none died of natural causes","Every king of the northern kingdom reigned for less than 25 years — the longest being Jeroboam II","Every king of the northern kingdom was from a non-Israelite family who seized power by force"] },
      { q: "Solomon accumulated 666 talents of gold per year, 700 wives, and 300 concubines. Which book of the Torah had specifically warned the king of Israel not to do these three things?", a: "Deuteronomy 17:16-17 — not to multiply horses (military), wives (politics), or gold (wealth)", d: ["Leviticus 18-20 — the holiness code that forbade Israel's leaders from foreign entanglements","Numbers 30 — the laws about vows and obligations that applied especially to Israel's leaders","Exodus 20 — the Ten Commandments, particularly those about having other gods and coveting"] },
    ],
  },
  "Paul's Letters": {
    200: [
      { q: "Paul wrote 'I can do all things through Christ who ___.' Fill in the blank.", a: "Strengthens me (Philippians 4:13)", d: ["Guides me (Ephesians 6:10)","Sustains me (Isaiah 46:4)","Comforts me (2 Corinthians 1:4)"] },
      { q: "Paul wrote 'For all have sinned and fall short of the ___ of God.' Fill in the blank.", a: "Glory (Romans 3:23)", d: ["Mercy (Ephesians 2:4)","Holiness (1 Peter 1:16)","Righteousness (Romans 3:21)"] },
      { q: "Paul wrote 'The wages of sin is death, but the gift of God is ___ in Christ Jesus.' Fill in the blank.", a: "Eternal life (Romans 6:23)", d: ["Forgiveness (Colossians 1:14)","Salvation (Romans 1:16)","Redemption (Ephesians 1:7)"] },
      { q: "Paul wrote 'Do not be anxious about anything, but in everything by prayer and ___, with thanksgiving, present your requests to God.'", a: "Supplication (Philippians 4:6)", d: ["Fasting (Matthew 6:16)","Confession (James 5:16)","Intercession (1 Timothy 2:1)"] },
      { q: "Paul wrote 'Be strong in the Lord and in His mighty ___.' Fill in the blank.", a: "Power (Ephesians 6:10)", d: ["Wisdom (James 1:5)","Grace (2 Corinthians 12:9)","Spirit (Romans 8:11)"] },
      { q: "Paul wrote 'For God so loved the world...' — wait, that was John. Paul wrote 'Love is patient, love is ___.' Fill in the blank.", a: "Kind (1 Corinthians 13:4)", d: ["Gentle (Galatians 5:22)","Holy (1 Peter 1:16)","Humble (Philippians 2:3)"] },
      { q: "Paul wrote 'There is therefore now no ___ for those who are in Christ Jesus.' Fill in the blank.", a: "Condemnation (Romans 8:1)", d: ["Shame (Romans 10:11)","Guilt (Hebrews 10:22)","Punishment (1 John 4:18)"] },
      { q: "Paul wrote 'Do not conform to the pattern of this world, but be ___ by the renewing of your mind.'", a: "Transformed (Romans 12:2)", d: ["Renewed (Ephesians 4:23)","Sanctified (1 Thessalonians 5:23)","Redeemed (Galatians 3:13)"] },
      { q: "Paul wrote 'And we know that in all things God works for the good of those who ___ Him.'", a: "Love (Romans 8:28)", d: ["Fear (Proverbs 1:7)","Seek (Hebrews 11:6)","Obey (John 14:23)"] },
      { q: "Paul wrote 'For it is by ___ you have been saved, through faith.'", a: "Grace (Ephesians 2:8)", d: ["Faith (Hebrews 11:1)","Works (James 2:24)","Mercy (Titus 3:5)"] },
    ],
    400: [
      { q: "Romans 8:28 says 'all things work together for good' for those who meet what condition?", a: "Those who love God and are called according to His purpose", d: ["Those who obey the law and keep all the commandments","Those who have never sinned and walk blamelessly","Those who pray without ceasing and fast regularly"] },
      { q: "In what book of the Bible does Paul describe putting on the full armor of God?", a: "Ephesians (Ephesians 6)" },
      { q: "Paul wrote that love 'never fails' in which famous chapter about love?", a: "1 Corinthians 13" },
      { q: "Paul wrote to the church in which city about 'rejoicing always' and 'the peace that passes understanding'?", a: "Philippi (the letter to the Philippians)" },
      { q: "Paul lists 9 fruits of the Spirit in Galatians 5. What is the very last fruit on the list?", a: "Self-control (Galatians 5:22-23)" },
      { q: "Paul wrote 'I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who ___.'", a: "Believes (Romans 1:16)" },
      { q: "Paul wrote in Romans 10:9 that if you confess with your mouth and believe in your heart two things, you will be saved. What are they?", a: "That Jesus is Lord (confess) and that God raised Him from the dead (believe)", d: ["That you are a sinner (confess) and that Christ died for you (believe)","That Jesus is the Son of God (confess) and that He forgives sin (believe)","That the Bible is true (confess) and that God created the world (believe)"] },
      { q: "Paul's letter to Titus describes the qualifications for an elder in the church. Name two character qualities required.", a: "Above reproach, faithful to his wife, self-controlled, hospitable, able to teach, not given to drunkenness — (Titus 1:6-9)", d: ["Wealthy, educated, well-spoken, and respected by city officials","A prophet, a healer, a great teacher, and a longtime believer","Celibate, fasting regularly, able to speak in tongues, and highly educated"] },
      { q: "Paul wrote 'Whatever is true, whatever is noble, whatever is right, whatever is pure — ___ about such things.' Fill in the blank.", a: "Think (Philippians 4:8)", d: ["Speak (James 1:19)","Pray (1 Thessalonians 5:17)","Rejoice (Philippians 4:4)"] },
      { q: "Paul wrote to the Corinthians that 'the greatest of these is ___.'", a: "Love (1 Corinthians 13:13)", d: ["Faith (Hebrews 11:1)","Hope (Romans 5:5)","Joy (John 15:11)"] },
    ],
    600: [
      { q: "Paul wrote that we are saved by grace through faith — and not by works. In which letter?", a: "Ephesians (Ephesians 2:8-9)" },
      { q: "In Galatians 5, Paul lists the fruit of the Spirit. What is the very first fruit listed?", a: "Love (Galatians 5:22)" },
      { q: "Paul told Timothy that all Scripture is 'God-breathed and useful for' what four purposes?", a: "Teaching, rebuking, correcting, and training in righteousness (2 Timothy 3:16)", d: ["Preaching, baptizing, healing, and prophesying","Fasting, praying, giving, and worshipping","Confessing, repenting, forgiving, and reconciling"] },
      { q: "Paul wrote that in Christ 'there is neither Jew nor Greek, slave nor free, male nor female' — in which letter?", a: "Galatians (Galatians 3:28)" },
      { q: "Paul described himself as the 'chief' or 'worst' of sinners. Why did he say this?", a: "Because he had persecuted the church of God (1 Timothy 1:15-16)", d: ["Because he had denied Christ three times (Luke 22:61)","Because he had stolen money from the temple treasury","Because he had worshipped idols as a young man in Tarsus"] },
      { q: "In Romans 12, Paul urges believers to 'present your bodies as a ___ sacrifice, holy and pleasing to God.'", a: "Living (Romans 12:1)", d: ["Holy (1 Peter 1:16)","Daily (Luke 9:23)","Willing (2 Corinthians 8:12)"] },
      { q: "Paul wrote about speaking in tongues in 1 Corinthians. What did he say was greater than speaking in tongues without interpretation?", a: "Prophecy (1 Corinthians 14:1-5)", d: ["Healing (1 Corinthians 12:9)","Teaching (1 Corinthians 12:28)","Intercession (Romans 8:26)"] },
      { q: "Paul wrote in 2 Corinthians 12 that God said to him 'My grace is sufficient for you, for my power is made perfect in ___.'", a: "Weakness", d: ["Suffering","Humility","Silence"] },
      { q: "Paul says in Colossians 3:16 to 'let the ___ of Christ dwell in you richly as you teach and admonish one another.'", a: "Word (message)", d: ["Spirit (Ephesians 5:18)","Peace (Colossians 3:15)","Love (Colossians 3:14)"] },
      { q: "Paul's letter to the Galatians was written primarily to counter a false teaching. What was that teaching?", a: "That Gentiles must be circumcised and follow the Law of Moses to be saved", d: ["That Jesus had not risen from the dead bodily but only spiritually","That only Jewish believers could lead the church as elders and deacons","That Christians must stop eating food sacrificed to idols or lose their salvation"] },
    ],
    800: [
      { q: "In Philippians 4:7, Paul describes 'the peace of God that ___ all understanding.'", a: "Surpasses", d: ["Transcends","Overcomes","Guards"] },
      { q: "Paul's shortest letter is about a runaway slave named Onesimus. What is the letter called?", a: "Philemon" },
      { q: "Paul wrote that he had learned the secret of being content in any situation. What does he say he has learned to do?", a: "To be content in all circumstances (Philippians 4:11-12)", d: ["To give thanks for everything, even suffering (1 Thessalonians 5:18)","To pray without ceasing until peace arrives (Philippians 4:6)","To rejoice always because hardship builds faith (Romans 5:3)"] },
      { q: "Paul wrote about the resurrection extensively in 1 Corinthians 15. What does he say would be true 'if Christ has not been raised'?", a: "Our faith is futile and we are still in our sins (1 Corinthians 15:17)", d: ["The law would still be required to earn salvation (Galatians 3:10)","The Holy Spirit would not have been sent to believers (John 16:7)","The prophecies of Isaiah would remain unfulfilled (Isaiah 53:10)"] },
      { q: "Paul wrote '...work out your salvation with fear and trembling, for it is ___ who works in you.' Fill in the blank.", a: "God (Philippians 2:12-13)", d: ["Christ (Galatians 2:20)","The Spirit (Romans 8:11)","Love (1 Corinthians 13:7)"] },
      { q: "In 2 Timothy 4, Paul describes his life coming to an end. What famous athletic metaphor does he use?", a: "'I have fought the good fight, I have finished the race, I have kept the faith' (2 Timothy 4:7)", d: ["'I have run the course, won the prize, and seized the crown' (1 Corinthians 9:24)","'I have trained hard, endured long, and earned my reward' (Hebrews 12:1)","'I have pressed on, strained forward, and reached the finish' (Philippians 3:14)"] },
      { q: "Paul lists the pieces of the armor of God in Ephesians 6. What does the shield of faith protect you from?", a: "All the flaming arrows (darts) of the evil one (Ephesians 6:16)", d: ["The schemes and tricks of false teachers in the church (Ephesians 4:14)","The temptations of the flesh and sinful desires (Galatians 5:16)","The persecution of governments and rulers of this world (Romans 8:35)"] },
      { q: "Paul wrote in Romans 5:8 that 'God demonstrates His own love for us in this: while we were still ___.'", a: "Sinners — 'Christ died for us' (Romans 5:8)", d: ["Enemies — 'He reconciled us to Himself' (Romans 5:10)","Lost — 'He sought us out and found us' (Luke 15:4)","Broken — 'He healed our wounds and restored us' (Hosea 6:1)"] },
      { q: "In 1 Corinthians 11, Paul corrects how the church was taking communion. What were they doing wrong?", a: "Some were eating and drinking without discerning the body of Christ — eating too much while others went hungry (1 Corinthians 11:20-21)", d: ["They were using bread made with yeast, which Paul said symbolized sin still in their lives","They were taking communion daily instead of weekly, which Paul said devalued the sacrament","They were allowing unbaptized guests to receive communion alongside church members"] },
      { q: "Paul urged believers in Colossians 4:6 to 'let your conversation always be full of grace, seasoned with ___.'", a: "Salt (so that you may know how to answer everyone)", d: ["Light (so that it may shine before others)","Wisdom (so that it builds up those who hear)","Truth (so that it corrects those who wander)"] },
    ],
    1000: [
      { q: "How many New Testament letters are traditionally attributed to Paul?", a: "13 letters (Romans through Philemon)" },
      { q: "Paul quotes which Old Testament prophet in Romans 1:17 to establish that 'the righteous shall live by faith'?", a: "Habakkuk (Habakkuk 2:4)" },
      { q: "In Romans 11, Paul uses what agricultural image to explain how Gentiles have been included in God's family alongside Israel?", a: "An olive tree — Gentiles are wild branches grafted in (Romans 11:17-24)", d: ["A vineyard — Gentiles are new laborers hired at the end of the day (Matthew 20:6)","A field of wheat — Gentiles are the grain sown among the original harvest (Matthew 13:24)","A fig tree — Gentiles are new shoots that grow after the old branches are cut away (Luke 13:6)"] },
      { q: "Paul wrote Romans while in the city of Corinth. Who is named in Romans 16:1-2 as the person who physically carried the letter to Rome?", a: "Phoebe — a deaconess from the church in Cenchreae", d: ["Priscilla — a tentmaker and teacher who traveled with Paul to Rome","Timothy — Paul's closest companion and co-worker on missionary journeys","Tertius — the scribe who wrote out the letter as Paul dictated it"] },
      { q: "In Romans 9-11, Paul wrestles with the question of Israel's rejection of Jesus. What mystery does he reveal in Romans 11:25?", a: "That a partial hardening has come upon Israel until the fullness of the Gentiles has come in — then all Israel will be saved", d: ["That Israel will turn back to God only after the Great Tribulation ends and Christ returns in glory","That God has permanently rejected Israel and replaced them entirely with the Gentile church","That the twelve tribes of Israel will be restored physically to their land before the end of the age"] },
      { q: "Paul wrote that the resurrection body is different from our earthly body. What four contrasts does he give in 1 Corinthians 15:42-44?", a: "Perishable vs. imperishable; dishonor vs. glory; weakness vs. power; natural body vs. spiritual body", d: ["Mortal vs. immortal; earthly vs. heavenly; temporary vs. eternal; flesh vs. spirit","Physical vs. divine; human vs. angelic; sinful vs. holy; visible vs. invisible","Broken vs. whole; corrupt vs. pure; dying vs. living; bound vs. free"] },
      { q: "Paul used the analogy of adoption in Romans 8. What word does he say we cry out because of the Spirit of adoption?", a: "'Abba, Father!' (Romans 8:15)", d: ["'Lord God Almighty!' (Revelation 4:8)","'My Redeemer lives!' (Job 19:25)","'Worthy is the Lamb!' (Revelation 5:12)"] },
      { q: "In Ephesians 2:8-9, Paul says we are saved by grace through faith and 'not of yourselves.' What does he say in verse 10 we ARE created for?", a: "Good works — 'which God prepared in advance for us to do' (Ephesians 2:10)", d: ["Worship — 'to glorify God and enjoy Him forever in all that we do'","Fellowship — 'to be joined together as one body in the Spirit'","Witness — 'to proclaim the gospel to every creature under heaven'"] },
      { q: "Paul wrote to Timothy 'All Scripture is God-breathed.' What is the Greek word translated 'God-breathed' and what does it literally mean?", a: "Theopneustos — 'God-breathed' (literally: blown out by God)", d: ["Theographos — 'God-written' (literally: inscribed by the hand of God)","Theosophia — 'God-wisdom' (literally: wisdom flowing directly from God)","Theologos — 'God-word' (literally: the very words spoken by God)"] },
      { q: "In 1 Corinthians 15, Paul presents the gospel in a creed-like summary. According to verses 3-5, what are the four key facts of the gospel?", a: "Christ died for our sins, was buried, was raised on the third day, and appeared to Peter and then the Twelve", d: ["Jesus was born of a virgin, lived sinlessly, was crucified, and ascended into heaven","Jesus fulfilled the Law, offered himself as sacrifice, conquered death, and sent the Holy Spirit","Jesus preached the kingdom, was betrayed, rose bodily, and commissioned the apostles to go"] },
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
      { q: "\"Fear not, for I am with you; be not dismayed, for I am your God.\"", a: "Isaiah 41:10" },
      { q: "\"Give thanks to the Lord, for He is good; His love endures forever.\"", a: "Psalm 107:1" },
      { q: "\"But seek first His kingdom and His righteousness, and all these things will be given to you as well.\"", a: "Matthew 6:33" },
      { q: "\"For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes.\"", a: "Romans 1:16" },
    ],
    400: [
      { q: "\"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.\"", a: "Proverbs 3:5-6" },
      { q: "\"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you a hope and a future.\"", a: "Jeremiah 29:11" },
      { q: "\"And we know that all things work together for good to those who love God, to those who are called according to His purpose.\"", a: "Romans 8:28" },
      { q: "\"Love is patient, love is kind. It does not envy, it does not boast, it is not proud.\"", a: "1 Corinthians 13:4" },
      { q: "\"Your word is a lamp to my feet and a light to my path.\"", a: "Psalm 119:105" },
      { q: "\"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.\"", a: "Matthew 7:7" },
      { q: "\"He gives strength to the weary and increases the power of the weak.\"", a: "Isaiah 40:29" },
      { q: "\"For where two or three gather in my name, there am I with them.\"", a: "Matthew 18:20" },
      { q: "\"I have hidden your word in my heart that I might not sin against you.\"", a: "Psalm 119:11" },
      { q: "\"The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you.\"", a: "Zephaniah 3:17" },
    ],
    600: [
      { q: "\"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.\"", a: "Joshua 1:9" },
      { q: "\"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.\"", a: "Isaiah 40:31" },
      { q: "\"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.\"", a: "Philippians 4:6" },
      { q: "\"Come to me, all you who are weary and burdened, and I will give you rest.\"", a: "Matthew 11:28" },
      { q: "\"Delight yourself in the Lord, and He will give you the desires of your heart.\"", a: "Psalm 37:4" },
      { q: "\"This is the day the Lord has made; let us rejoice and be glad in it.\"", a: "Psalm 118:24" },
      { q: "\"Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.\"", a: "Psalm 23:4" },
      { q: "\"Create in me a pure heart, O God, and renew a steadfast spirit within me.\"", a: "Psalm 51:10" },
      { q: "\"Blessed are the pure in heart, for they will see God.\"", a: "Matthew 5:8" },
      { q: "\"In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.\"", a: "Matthew 5:16" },
    ],
    800: [
      { q: "\"For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.\"", a: "Romans 6:23" },
      { q: "\"If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven and will heal their land.\"", a: "2 Chronicles 7:14" },
      { q: "\"Submit yourselves therefore to God. Resist the devil, and he will flee from you.\"", a: "James 4:7" },
      { q: "\"Do not conform to the pattern of this world, but be transformed by the renewing of your mind.\"", a: "Romans 12:2" },
      { q: "\"Greater love has no one than this: to lay down one's life for one's friends.\"", a: "John 15:13" },
      { q: "\"Cast all your anxiety on him because he cares for you.\"", a: "1 Peter 5:7" },
      { q: "\"Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!\"", a: "2 Corinthians 5:17" },
      { q: "\"My grace is sufficient for you, for my power is made perfect in weakness.\"", a: "2 Corinthians 12:9" },
      { q: "\"And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.\"", a: "Philippians 4:7" },
      { q: "\"I sought the Lord, and he answered me; he delivered me from all my fears.\"", a: "Psalm 34:4" },
    ],
    1000: [
      { q: "\"For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.\"", a: "Ephesians 2:8-9" },
      { q: "\"No weapon forged against you will prevail, and you will refute every tongue that accuses you. This is the heritage of the servants of the Lord.\"", a: "Isaiah 54:17" },
      { q: "\"Now faith is confidence in what we hope for and assurance about what we do not see.\"", a: "Hebrews 11:1" },
      { q: "\"The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.\"", a: "John 10:10" },
      { q: "\"I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.\"", a: "Galatians 2:20" },
      { q: "\"Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.\"", a: "1 Thessalonians 5:16-18" },
      { q: "\"But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.\"", a: "Romans 5:8" },
      { q: "\"Jesus Christ is the same yesterday and today and forever.\"", a: "Hebrews 13:8" },
      { q: "\"For God has not given us a spirit of fear, but of power and of love and of a sound mind.\"", a: "2 Timothy 1:7" },
      { q: "\"The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.\"", a: "Numbers 6:24-26" },
    ],
  },

  "Disney": {
    200: [
      { q: "This queen of Arendelle has the power to create ice and snow and sings 'Let It Go.'", a: "Elsa (Frozen)" },
      { q: "This villain from The Lion King is Simba's uncle who murders King Mufasa.", a: "Scar" },
      { q: "In Finding Nemo, what type of fish is Nemo?", a: "A clownfish" },
      { q: "This cowboy toy is the leader of the toys in Toy Story and is voiced by Tom Hanks.", a: "Woody" },
      { q: "Rapunzel's magical hair in Tangled has the power to do what?", a: "Heal people and grant eternal youth" },
      { q: "This candelabra is a talking servant in Beauty and the Beast who is always cheerful.", a: "Lumiere" },
      { q: "This demigod in Moana can shape-shift and has a magical fishhook.", a: "Maui" },
      { q: "This cowgirl doll joins Woody's gang in Toy Story 2.", a: "Jessie" },
      { q: "In The Little Mermaid, Ariel collects human objects because she wants to do what?", a: "Become human (live on land)" },
      { q: "This Disney princess is put under a sleeping curse and is sometimes called Briar Rose.", a: "Aurora (Sleeping Beauty)" },
    ],
    400: [
      { q: "In the movie Up, what is the name of the young girl Carl Fredricksen falls in love with and marries?", a: "Ellie" },
      { q: "In Ratatouille, what is the name of the rat who dreams of becoming a chef?", a: "Remy" },
      { q: "In Inside Out, how many core emotions live inside Riley's head?", a: "Five (Joy, Sadness, Fear, Anger, Disgust)" },
      { q: "This sea witch steals Ariel's voice in The Little Mermaid.", a: "Ursula" },
      { q: "In Encanto, what is the name of the magical family at the center of the story?", a: "The Madrigals" },
      { q: "Stitch is experiment number what in Lilo & Stitch?", a: "626" },
      { q: "In Brave, Merida's mother is transformed into what animal?", a: "A bear" },
      { q: "What is the name of the kingdom in Frozen where Elsa and Anna live?", a: "Arendelle" },
      { q: "In The Lion King, 'Hakuna Matata' means no worries in what real language?", a: "Swahili" },
      { q: "This villain in Coco stole Miguel's great-great-grandfather's songs and took credit for them.", a: "Ernesto de la Cruz" },
    ],
    600: [
      { q: "Snow White and the Seven Dwarfs was released in what year, making it Disney's first feature film?", a: "1937" },
      { q: "This villain is the Judge of Paris who condemns Quasimodo's mother and later becomes obsessed with Esmeralda.", a: "Judge Claude Frollo (The Hunchback of Notre Dame)" },
      { q: "A Bug's Life was Pixar's second feature film. What was the title of Pixar's third?", a: "Toy Story 2" },
      { q: "In The Incredibles, the island where Syndrome has his lair is called what?", a: "Nomanisan Island", d: ["Kronos Island","Velocette Island","Omnidroid Island"] },
      { q: "In Zootopia, Judy Hopps starts her career as what type of officer before becoming a detective?", a: "A meter maid (parking enforcement)" },
      { q: "In The Princess and the Frog, Tiana's dream is to open her own what?", a: "Restaurant" },
      { q: "In Encanto, Mirabel Madrigal is the only family member who doesn't receive what?", a: "A magical gift" },
      { q: "In Beauty and the Beast, the enchanted rose losing its petals represents what countdown?", a: "The time left before the spell becomes permanent (the Beast's last chance to fall in love)" },
      { q: "In Toy Story 3, the toys narrowly escape being incinerated in what location?", a: "The garbage dump furnace (Sunnyside's incinerator)" },
      { q: "At the end of The Princess and the Frog, why does Tiana briefly turn into a frog after kissing Naveen?", a: "Because she is not a princess — the kiss doesn't break the spell (she has to marry him first)", d: ["Because Dr. Facilier's voodoo shadow curse was stronger than a single kiss and needed to be broken at midnight","Because Mama Odie's spell required both frogs to jump into the bayou together to break the enchantment","Because Louis the alligator accidentally bumped them apart before the kiss could fully take effect"] },
    ],
    800: [
      { q: "In the original Toy Story, what is the name of the mean kid next door who destroys toys?", a: "Sid" },
      { q: "Before Mickey Mouse, Walt Disney had a character called Oswald. What kind of animal was Oswald?", a: "A rabbit (Oswald the Lucky Rabbit)" },
      { q: "What hidden code found in many Pixar films refers to the classroom number at CalArts where many Pixar directors studied?", a: "A113" },
      { q: "What was the name of the short film featuring the Pixar lamp (Luxo Jr.) that debuted at SIGGRAPH in 1986?", a: "Luxo Jr." },
      { q: "What does Simba's name mean in Swahili?", a: "Lion" },
      { q: "In Frozen 2, what are the names of Elsa and Anna's parents?", a: "Agnarr and Iduna" },
      { q: "In Finding Nemo, what is the name of the group of fish living in the dentist's tank?", a: "The Tank Gang" },
      { q: "What is the Beast's real name in Beauty and the Beast?", a: "Prince Adam" },
      { q: "In Moana, the giant crab Tamatoa sings a song called what?", a: "\"Shiny\"" },
      { q: "In Moana, what are the names of Moana's pet pig and chicken?", a: "Pua (pig) and Hei Hei (chicken)" },
    ],
    1000: [
      { q: "The music in Fantasia's 'The Sorcerer's Apprentice' segment was composed by what classical composer?", a: "Paul Dukas", d: ["Claude Debussy","Igor Stravinsky","Modest Mussorgsky"] },
      { q: "Cars 2 is notable in Pixar history for being the first Pixar film to fail to receive what accolade?", a: "An Academy Award nomination for Best Animated Feature", d: ["A Golden Globe nomination for Best Animated Feature Film","An Annie Award for Outstanding Achievement in Animation","A Rotten Tomatoes score above 50% from critics"] },
      { q: "What Grammy-winning singer voiced Elsa in Frozen and also performed 'Let It Go'?", a: "Idina Menzel" },
      { q: "Pinocchio is based on a novel by what Italian author?", a: "Carlo Collodi", d: ["Alessandro Manzoni","Luigi Pirandello","Giovanni Boccaccio"] },
      { q: "Up made history at the Academy Awards by becoming only the second animated film nominated for what award, alongside Best Animated Feature?", a: "Best Picture", d: ["Best Original Screenplay","Best Director","Best Original Score"] },
      { q: "The Incredibles was the first Pixar film to feature an all-what cast, making it a milestone for the studio?", a: "All-human (human characters as leads)", d: ["All-original story — no adaptation from a book, fairy tale, or existing franchise","All-voice cast with no motion capture — a contrast to what DreamWorks was doing at the time","All-digital score — the first Pixar film composed entirely with digital instruments without an orchestra"] },
      { q: "A 'Hidden Mickey' is a famous Disney Easter egg. What shape does it take?", a: "Three circles arranged to form Mickey Mouse's head and ears", d: ["A silhouette of Mickey waving with his iconic white gloves against a dark background","The letters 'M-K-Y' arranged subtly in park decorations and film scenes","A small drawing of Mickey's face — full portrait with nose, eyes, and smile"] },
      { q: "In Inside Out 2, a new emotion is introduced into Riley's mind. What is this new emotion?", a: "Anxiety" },
      { q: "Soul was Pixar's first film to debut directly on what streaming service during the 2020 holiday season?", a: "Disney+" },
      { q: "In Coco, there is a rule that dead ancestors can only cross the marigold bridge to visit the living on Día de los Muertos if they have what?", a: "A photo on a living family member's ofrenda (altar)" },
    ],
  },

  "Video Games": {
    200: [
      { q: "This moustachio'd plumber is Nintendo's most famous mascot and stars in games that bear his name.", a: "Mario" },
      { q: "In Minecraft, these green hissing monsters explode when they get close to players.", a: "Creepers" },
      { q: "In this battle royale game, players parachute onto an island and try to be the last one standing while a storm closes in.", a: "Fortnite" },
      { q: "In The Legend of Zelda series, what is the name of the main villain Link must repeatedly defeat?", a: "Ganon (Ganondorf)" },
      { q: "In Among Us, players are split into two groups: Crewmates and what?", a: "Impostors" },
      { q: "This green dinosaur can be ridden by Mario and can eat enemies with its long tongue.", a: "Yoshi" },
      { q: "In Mario Kart, what notoriously difficult item locks onto the player in first place?", a: "The blue shell (spiny shell)" },
      { q: "What is the name of Mario's giant turtle nemesis who is also the king of the Koopas?", a: "Bowser" },
      { q: "What Nintendo gaming console uses detachable controllers called Joy-Cons and can be played at home or on the go?", a: "Nintendo Switch" },
      { q: "In Minecraft, what is the dangerous fire-filled dimension you can travel to through a portal made of obsidian?", a: "The Nether" },
    ],
    400: [
      { q: "In Fortnite's classic Battle Royale mode, how many players start each match?", a: "100 players" },
      { q: "In The Legend of Zelda, what is the name of the hero who wears a green tunic and carries a sword and shield?", a: "Link" },
      { q: "What is the name of Minecraft's final boss, found in a special dimension called The End?", a: "The Ender Dragon" },
      { q: "Minecraft has sold over 200 million copies, making it what record?", a: "The best-selling video game of all time", d: ["The most-watched game on YouTube of all time","The first indie game to reach 100 million players","The most-played mobile game in history"] },
      { q: "In gaming, what does RPG stand for?", a: "Role-Playing Game" },
      { q: "In this browser-based drawing and guessing game, players take turns drawing a word while others try to guess it in chat.", a: "Skribbl.io" },
      { q: "What is the name of the virtual currency used to buy items and accessories in Roblox?", a: "Robux" },
      { q: "How many playable characters are in Super Smash Bros. Ultimate, the largest roster in the franchise's history?", a: "89 fighters" },
      { q: "In Apex Legends, players compete in teams of three, choosing unique characters called what?", a: "Legends" },
      { q: "In Mario Party, players roll dice and move around a board, competing in short mini-games. What is this style of gameplay called?", a: "A board game" },
    ],
    600: [
      { q: "In what year was Minecraft officially released to the public as a full game?", a: "2011" },
      { q: "In Undertale, what special game route allows players to complete the entire game without killing a single enemy?", a: "The Pacifist Route" },
      { q: "What Japanese gaming company created Mario, Zelda, and Donkey Kong?", a: "Nintendo" },
      { q: "In Breath of the Wild, what is the name of the ancient evil that Link and Zelda have been trying to stop for 100 years?", a: "Calamity Ganon" },
      { q: "In Minecraft, what is the name of the difficulty mode where death is permanent and the world is deleted?", a: "Hardcore mode" },
      { q: "Among Us was created by a small indie studio called what?", a: "InnerSloth" },
      { q: "What battle royale game, known by its abbreviation PUBG, is credited as one of the games that started the battle royale genre?", a: "PlayerUnknown's Battlegrounds" },
      { q: "In The Legend of Zelda, the Triforce is split into three pieces representing Power, Courage, and what third virtue?", a: "Wisdom" },
      { q: "In Valorant, players choose unique agents with special abilities and compete in teams of five. What company makes Valorant?", a: "Riot Games" },
      { q: "In Stardew Valley, players inherit a farm from their grandfather and must restore it. Who created this game?", a: "Eric Barone (ConcernedApe)" },
    ],
    800: [
      { q: "What year did Sony release the original PlayStation, entering the video game console market for the first time?", a: "1994" },
      { q: "Microsoft acquired Mojang, the studio behind Minecraft, in 2014 for approximately how much money?", a: "$2.5 billion", d: ["$1 billion","$7.5 billion","$500 million"] },
      { q: "In Minecraft, what rare material, stronger than diamond, is found in the Nether?", a: "Netherite" },
      { q: "The International is the world championship tournament for what popular PC game, known for its massive prize pools?", a: "Dota 2" },
      { q: "Animal Crossing: New Horizons became a massive hit during 2020. On what Nintendo console does it play?", a: "Nintendo Switch" },
      { q: "In gaming, what does E3 stand for, the famous gaming expo held in Los Angeles?", a: "Electronic Entertainment Expo" },
      { q: "What Nintendo franchise, featuring a mustachio'd plumber, is the best-selling video game franchise of all time?", a: "Mario" },
      { q: "In Splatoon, players compete by covering the map with their team's color of what substance?", a: "Ink" },
      { q: "In Fall Guys, players compete in a series of wacky mini-games until one player wins a crown. What are the players dressed as?", a: "Colorful jellybean-shaped characters" },
      { q: "Wii Sports, bundled with the Nintendo Wii in 2006, became one of the best-selling games ever. Name three of its five sports.", a: "Tennis, Baseball, Bowling, Golf, Boxing (any three)", d: ["Soccer, Basketball, Swimming, Volleyball, and Running","Tennis, Soccer, Baseball, Basketball, and Archery","Bowling, Golf, Tennis, Table Tennis, and Frisbee"] },
    ],
    1000: [
      { q: "The original Nintendo Entertainment System (NES) was released in North America in what year?", a: "1985", d: ["1983","1987","1989"] },
      { q: "The famous Konami Code (Up, Up, Down, Down, Left, Right, Left, Right, B, A) was first used in what NES game?", a: "Contra", d: ["Gradius","Castlevania","Teenage Mutant Ninja Turtles"] },
      { q: "In Minecraft, what is the rarest ore that generates only near the deepest levels and glows green?", a: "Emerald ore", d: ["Ancient debris","Diamond ore","Netherite ingot"] },
      { q: "The World Video Game Hall of Fame is located in Rochester, New York, inside what museum?", a: "The Strong National Museum of Play", d: ["The Smithsonian American History Museum","The Computer History Museum (Mountain View, CA)","The National Entertainment Collectibles Museum"] },
      { q: "In gaming culture, what does 'GG' stand for, typically typed in chat at the end of a match?", a: "Good Game" },
      { q: "In online multiplayer games, what term describes a skilled player who creates a low-level account to play against beginners?", a: "Smurfing", d: ["Sandbagging","Seal clubbing","Reverse boosting"] },
      { q: "What Amazon-owned streaming platform, used primarily for watching people play video games live, launched in 2011?", a: "Twitch" },
      { q: "Overwatch, developed by Blizzard, is a team-based hero shooter. How many players are on each team in a standard match?", a: "Five (5v5)", d: ["Six (6v6)","Four (4v4)","Three (3v3)"] },
      { q: "Hades, a roguelike dungeon crawler, was developed by what independent studio known for Bastion and Transistor?", a: "Supergiant Games", d: ["Team Cherry (developers of Hollow Knight)","Motion Twin (developers of Dead Cells)","Moon Studios (developers of Ori and the Blind Forest)"] },
      { q: "What annual video game awards show, hosted by Geoff Keighley, is often called 'The Oscars of Gaming'?", a: "The Game Awards" },
    ],
  },

  "Gen Alpha Slang": {
    200: [
      { q: "If someone says 'no cap,' what do they mean?", a: "They're telling the truth" },
      { q: "If you say a song 'slaps,' what are you saying about it?", a: "It's really good" },
      { q: "In Gen Alpha slang, what does the letter 'W' stand for when someone says 'that's a W'?", a: "Win" },
      { q: "If someone says the food is 'bussin,' what are they saying?", a: "It's delicious" },
      { q: "If someone calls something 'mid,' what does that mean?", a: "It's average or mediocre" },
      { q: "If you say you 'lowkey' like something, what does that mean?", a: "You secretly or quietly like it" },
      { q: "In Among Us and Gen Alpha slang, what does 'sus' mean?", a: "Suspicious" },
      { q: "When Gen Alpha says something 'hits different,' what do they mean?", a: "It affects you in a uniquely stronger way" },
      { q: "If someone says an outfit is 'fire,' what are they saying?", a: "It looks amazing" },
      { q: "What one-word exclamation meaning 'wow' or 'that's impressive' sounds like you're hissing?", a: "Sheesh" },
    ],
    400: [
      { q: "If someone says you're 'capping,' what are they accusing you of?", a: "Lying" },
      { q: "What Gen Alpha slang term refers to natural charm, social confidence, or the ability to attract others?", a: "Rizz" },
      { q: "If someone says you 'understood the assignment,' what does that mean?", a: "You did exactly what was expected and nailed it" },
      { q: "When someone says a thought is 'living rent free' in their head, what does that mean?", a: "They can't stop thinking about it" },
      { q: "What does it mean when someone has 'main character energy'?", a: "They act like the most important person in the room" },
      { q: "If a performer 'ate and left no crumbs,' what did they do?", a: "They performed perfectly with nothing left to criticize" },
      { q: "When Gen Alpha says something is 'giving,' they follow it with what type of word?", a: "A vibe or mood (e.g., 'giving villain era,' 'giving royalty')" },
      { q: "What does NPC mean in internet and gaming slang?", a: "Non-Player Character" },
      { q: "When someone tells you to 'slay,' what are they encouraging you to do?", a: "Look amazing and be confident" },
      { q: "What does 'fr fr' mean in texting and social media?", a: "For real, for real (emphasizing sincerity)" },
    ],
    600: [
      { q: "If someone calls an opinion or take 'based,' what does that mean?", a: "Confidently held without caring what others think" },
      { q: "When Gen Alpha says someone is in their 'era,' like their 'villain era,' what does it mean?", a: "They're going through a specific phase or version of themselves" },
      { q: "When older people tell someone to 'touch grass,' what are they telling that person to do?", a: "Go outside / spend less time online" },
      { q: "What Gen Alpha term describes content, images, or videos that are repetitive, mindless, or rotting your brain?", a: "Brain rot" },
      { q: "What is a 'vibe check'?", a: "A test of someone's energy or mood" },
      { q: "What Gen Alpha term, shortened from 'delusional,' describes someone who is unrealistically optimistic about something?", a: "Delulu" },
      { q: "In Gen Alpha slang, if someone has good 'aura,' what does that mean?", a: "They have a cool, attractive energy" },
      { q: "What does 'the ick' mean — the feeling you get when something about a person suddenly puts you off?", a: "A sudden feeling of disgust or loss of attraction toward someone" },
      { q: "What does it mean to 'stan' someone?", a: "To be an extremely devoted or obsessive fan of someone" },
      { q: "What is the difference between 'lowkey' and 'highkey' when used in Gen Alpha speech?", a: "Lowkey means subtly or secretly, while highkey means obviously or intensely" },
    ],
    800: [
      { q: "In Gen Alpha culture, what does it mean for someone to be a 'sigma'?", a: "An independent, self-sufficient person who doesn't follow the crowd" },
      { q: "The 'Ohio' meme is used to describe what type of situation or content?", a: "Something bizarre, strange, or inexplicably weird" },
      { q: "What does adding 'periodt' to the end of a statement emphasize?", a: "That the statement is final and there is nothing more to discuss" },
      { q: "If someone says 'you're cooked,' what do they mean?", a: "You're in serious trouble with no hope of success" },
      { q: "What does 'no shot' mean when used as a reaction to hearing something surprising?", a: "There is no way that's true" },
      { q: "In gaming and internet slang, what does it mean to 'catch an L'?", a: "To take a loss or suffer a defeat" },
      { q: "On social media, what does it mean to 'ratio' someone?", a: "When the replies or dislikes on a post outnumber the likes, implying the post was bad" },
      { q: "In Gen Alpha slang, what does it mean if someone is accused of 'glazing' a celebrity or content creator?", a: "Excessively praising or being a superfan of someone to an embarrassing degree" },
      { q: "What would it mean for someone to have 'W rizz'?", a: "They have excellent charm and the natural ability to attract people" },
      { q: "When someone tells you to 'log off,' what are they really telling you?", a: "Get off the internet and take a break" },
    ],
    1000: [
      { q: "What internet personality is widely credited with popularizing the term 'rizz' through his streams and videos?", a: "Kai Cenat" },
      { q: "What YouTube animated series, created by DaFuqBoom, features characters with toilet-shaped heads and became a Gen Alpha cultural phenomenon?", a: "Skibidi Toilet" },
      { q: "In Gen Alpha culture, what is 'Fanum tax' and where does the term come from?", a: "When a friend steals food off your plate — named after streamer Fanum who did this on streams with Kai Cenat" },
      { q: "When Gen Alpha says someone has 'lore,' what do they mean in an internet context?", a: "That person has a complicated backstory or history worth knowing about" },
      { q: "What does it mean to have 'zero aura' in Gen Alpha speak?", a: "You have no cool energy and are deeply uncool" },
      { q: "The Gen Alpha use of 'NPC' expanded from gaming to describe what kind of person in real life?", a: "Someone who acts mindlessly and follows the crowd without thinking" },
      { q: "When someone is called 'built different,' what does it mean?", a: "They are uniquely exceptional or have qualities that set them apart from others" },
      { q: "What is the 'sigma grindset' and why is it often used sarcastically?", a: "A parody of hustle culture that says you must sacrifice fun and relationships to be productive — used sarcastically to mock overworking" },
      { q: "What does 'on God' mean when added to the end of a sentence?", a: "I swear this is completely true" },
      { q: "What term describes someone who spends so much time online that they are completely disconnected from the real world?", a: "Chronically online" },
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
    // Major OT figures
    "Moses","Abraham","David","Solomon","Elijah","Jonah","Joseph","Samson",
    "Daniel","Noah","Isaiah","Nehemiah","Jacob","Joshua","Gideon","Caleb",
    "Ezekiel","Jeremiah","King Saul","Boaz","Elisha","Ezra","Zechariah",
    // NT figures
    "Paul","Peter","John","James","Stephen","Philip","Barnabas","Timothy",
    "John the Baptist","Mary Magdalene","Nicodemus","Zacchaeus","Cornelius",
    // Women
    "Esther","Ruth","Deborah","Rahab","Hannah","Miriam","Lydia","Priscilla",
    "Jael","Abigail","Bathsheba","Elizabeth","Anna","Mary (mother of Jesus)",
    // Minor characters often confused
    "Ananias","Matthias","Agabus","Silas","Apollos","Aquila",
  ],
  "Life of Jesus": [
    // Places
    "Bethlehem","Nazareth","Jerusalem","Jericho","Capernaum","Galilee",
    "Bethany","Gethsemane","Golgotha","Jordan River","Cana","Emmaus",
    // Time spans / numbers
    "40 days","3 days","7 days","12 years","30 years","3 years","3 hours",
    // People
    "Peter","James","John","Andrew","Mary","Matthew","Luke","Thomas",
    "Judas Iscariot","Mary Magdalene","Nicodemus","Zacchaeus","Lazarus",
    "Herod","Pilate","Caiaphas","Simeon","Anna","Joseph of Arimathea",
    // Titles and concepts
    "Son of Man","Son of God","Messiah","Rabbi","King of the Jews","Emmanuel",
    "the Bread of Life","the Light of the World","the Good Shepherd",
  ],
  "Miracles": [
    // People involved in miracles
    "Moses","Elijah","Elisha","Peter","Jesus","Philip","Paul","Ananias",
    "Naaman","Hezekiah","Joshua","Gideon","Samson","Jairus","Bartimaeus",
    // Locations of miracles
    "The Red Sea","Jericho","The Jordan River","Cana","Bethesda",
    "The Sea of Galilee","Mount Carmel","Nain","Siloam","Bethlehem",
    // Miracle-related objects / provisions
    "5 loaves and 2 fish","Manna","Water from a rock","A staff","Oil",
    "A bronze snake","The ark of the covenant","Fire from heaven","A fleece",
    // Short descriptive phrases (for "what happened?" type answers)
    "He raised someone from the dead","He healed a blind man",
    "He walked on water","He fed thousands with little food",
    "He calmed a storm","He turned water into wine",
    "He parted the water","He made the sun stand still",
  ],
  "Women of the Bible": [
    // OT women
    "Ruth","Rahab","Sarah","Miriam","Esther","Deborah","Delilah",
    "Naomi","Bathsheba","Hannah","Abigail","Leah","Rachel","Rebekah",
    "Jael","Tamar","Hagar","Zipporah","Michal","Jezebel","Athaliah",
    "The widow of Zarephath","The Shunammite woman",
    // NT women
    "Mary (mother of Jesus)","Mary Magdalene","Elizabeth","Anna","Lydia",
    "Priscilla","Phoebe","Dorcas (Tabitha)","Martha","Joanna","Salome",
    "The Samaritan woman at the well","The woman who lost a coin",
    // For description-type answers
    "She hid the spies on her roof","She judged Israel under a palm tree",
    "She was healed after touching Jesus' cloak","She anointed Jesus' feet",
    "She was raised from the dead by Peter","She believed before her husband",
  ],
  "Numbers & Facts": [
    // Small numbers
    "3","7","10","12","40","66","70","120","150","153",
    // Specific spans of time
    "3 days","7 days","40 days","3 years","7 years","40 years","70 years","450 years",
    // Specific Bible quantities
    "500 people","969 years","153 fish","144,000 people","12 tribes",
    "7 churches","24 elders","3,000 saved","5 loaves and 2 fish",
    "30 pieces of silver","6 days","1,260 days",
    // Bible book counts
    "66 books","39 books","27 books","929 chapters","1,189 chapters",
  ],
  "The Early Church": [
    // Cities of the early church
    "Jerusalem","Antioch","Corinth","Ephesus","Rome","Philippi",
    "Thessalonica","Athens","Caesarea","Lystra","Derbe","Malta","Damascus",
    // Key people
    "Peter","Paul","Barnabas","Stephen","Philip","Ananias","Cornelius",
    "Rhoda","Silas","Timothy","Apollos","Lydia","Priscilla","Aquila",
    "James","John","Agabus","Eutychus","Dorcas","Felix","Festus","Agrippa",
    // Events and concepts
    "Pentecost","The Jerusalem Council","Paul's first missionary journey",
    "The stoning of Stephen","Paul's conversion on the road to Damascus",
    // Numbers
    "3,000 people","120 believers","Seven deacons","Fourteen years",
  ],
  "Prophets": [
    // The major and minor prophets (names — for "which prophet?" questions)
    "Elijah","Elisha","Isaiah","Jeremiah","Ezekiel","Daniel",
    "Hosea","Micah","Jonah","Amos","Zechariah","Malachi",
    "Nahum","Habakkuk","Joel","Obadiah","Haggai","Zephaniah","Natan",
    // Key people in prophetic accounts
    "King Ahab","Jezebel","Nebuchadnezzar","Cyrus","King Hezekiah",
    "King Josiah","The widow of Zarephath","Gehazi","Belshazzar",
    // Key locations
    "Jerusalem","Babylon","Nineveh","Samaria","The Kidron Valley",
    // Short descriptive phrases (for "what did the prophet say/do?" answers)
    "He was taken to heaven in a whirlwind","He lived in the wilderness",
    "He was swallowed by a large fish","He lay on his side for 390 days",
    "He read from a scroll and ate it","He was thrown into a lion's den",
    "God told him to marry an unfaithful woman",
  ],
  "Psalms & Proverbs": [
    // Psalm numbers — for "which psalm is this?" questions
    "Psalm 1","Psalm 22","Psalm 23","Psalm 27","Psalm 46","Psalm 51",
    "Psalm 91","Psalm 100","Psalm 119","Psalm 139","Psalm 2","Psalm 8",
    "Psalm 16","Psalm 32","Psalm 37","Psalm 103","Psalm 121","Psalm 150",
    // Proverbs references
    "Proverbs 3:5-6","Proverbs 4:23","Proverbs 16:18","Proverbs 22:6","Proverbs 31",
    // Authors and facts
    "Solomon","David","Asaph","Moses","The sons of Korah",
    "176 verses","150 Psalms","73 written by David","31 chapters",
    // Short phrases (for fill-in-blank or description answers)
    "The Lord is my shepherd","Trust in the Lord with all your heart",
    "Pride goes before a fall","A good name is better than riches",
    "The fear of the Lord is the beginning of wisdom",
    "A gentle answer turns away wrath",
  ],
  "Creation & Genesis": [
    // People in Genesis
    "Adam","Eve","Noah","Abraham","Isaac","Jacob","Joseph",
    "Cain","Abel","Lot","Melchizedek","Rebekah","Laban","Esau","Benjamin",
    "Potiphar","Pharaoh","Abimelech","Hagar","Ishmael","Zilpah","Bilhah",
    // Places
    "Garden of Eden","Mount Ararat","Babel","Canaan","Haran","Egypt",
    "Sodom","Gomorrah","Beersheba","Hebron","Shechem","Moriah",
    // Creation days / facts
    "Day 1","Day 2","Day 3","Day 4","Day 5","Day 6",
    "Light","Sky and water","Land and plants","Sun, moon, and stars","Sea creatures and birds",
    // Items / symbols
    "A rainbow","A coat of many colors","A staff","A birthright",
    "An altar","Garments of skin","A well","50 chapters","Twelve sons",
  ],
  "Kings & Kingdoms": [
    // Kings of Israel and Judah
    "King Saul","David","Solomon","Rehoboam","Jeroboam","Ahab","Jehoshaphat",
    "Hezekiah","Josiah","Manasseh","Asa","Omri","Joash","Uzziah",
    "Jehu","Pekah","Hoshea","Jehoiachin","Zedekiah",
    // Foreign kings
    "Nebuchadnezzar","Cyrus","Darius","Belshazzar","Sennacherib","Pharaoh",
    // Kingdoms and places
    "Israel","Judah","Babylon","Assyria","Persia","Egypt","Philistia",
    // Prophets and advisors who interact with kings
    "Nathan","Elijah","Elisha","Isaiah","Jeremiah","Huldah","Samuel",
    // Numbers / facts about the kings
    "Three kings","Forty years","Nineteen kings","Twelve tribes",
    "700 wives","1,400 chariots","15 extra years","Eight years old",
  ],
  "Paul's Letters": [
    // Letters Paul wrote — for "in which book?" questions
    "Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians",
    "Philippians","Colossians","1 Thessalonians","2 Thessalonians",
    "1 Timothy","2 Timothy","Titus","Philemon",
    // Cities — for location questions
    "Corinth","Ephesus","Rome","Antioch","Thessalonica","Cenchreae","Philippi",
    // People Paul references — for "who did Paul quote/mention?" questions
    "Habakkuk","Isaiah","Abraham","Moses","Timothy","Titus","Silas","Barnabas",
    // Single theological words — for fill-in-the-blank questions
    "grace","mercy","faith","hope","peace","joy","wisdom","power","strength",
    "salvation","righteousness","sanctification","redemption","forgiveness",
    "glory","truth","kindness","humility","obedience","patience","holiness",
    // Short fill-in phrases
    "surpasses all understanding","through faith alone","in all circumstances",
    "of the Holy Spirit","renewed in Christ","above every name",
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
  "Disney": [
    // Heroes and princesses
    "Elsa","Anna","Moana","Rapunzel","Ariel","Belle","Tiana","Mulan","Merida","Cinderella",
    "Aurora","Snow White","Jasmine","Pocahontas","Mirabel","Isabela","Luisa","Dolores",
    // Supporting and side characters
    "Simba","Nemo","Dory","Woody","Buzz Lightyear","Mike Wazowski","Sulley","Lightning McQueen",
    "WALL-E","Remy","Carl Fredricksen","Russell","Stitch","Miguel","Joy","Sadness","Olaf",
    // Villains
    "Ursula","Scar","Jafar","Maleficent","Gaston","Hades","Mother Gothel","Hans","Yzma","Tamatoa",
    // Movie titles
    "Frozen","The Lion King","Finding Nemo","Toy Story","Moana","Encanto","Coco",
    "Up","Brave","Ratatouille","The Incredibles","Inside Out","Zootopia","Tangled",
    "The Little Mermaid","Beauty and the Beast","Aladdin","Lilo & Stitch",
    "A Bug's Life","Monsters Inc.","Sleeping Beauty","Fantasia","The Princess and the Frog",
  ],
  "Video Games": [
    // Characters
    "Mario","Luigi","Link","Princess Peach","Kirby","Samus","Fox McCloud",
    "Sonic","Donkey Kong","Yoshi","Bowser","Ganondorf","Princess Zelda","Toad",
    "Steve","Creeper","Enderman","Ender Dragon","Ghast","Wither",
    // Game titles
    "Minecraft","Fortnite","Among Us","Roblox","Stardew Valley","Undertale","Valorant",
    "Apex Legends","Overwatch","Hades","Fall Guys","Animal Crossing","Splatoon",
    "Super Mario Bros.","The Legend of Zelda","Super Smash Bros.","Mario Kart","Mario Party",
    "Tetris","Pac-Man","Street Fighter","Mega Man",
    // Companies and platforms
    "Nintendo","Sony PlayStation","Microsoft Xbox","Sega","Valve","Riot Games",
    "Blizzard Entertainment","InnerSloth","Mojang","Epic Games","Supergiant Games",
    "Nintendo Switch","PlayStation 5","Xbox Series X","Nintendo 64","Super Nintendo",
    // In-game items and concepts
    "Triforce","Robux","Netherite","Blue Shell","Joy-Cons","Master Sword","Fire Flower","Golden Apple",
  ],
  "Gen Alpha Slang": [
    // Creator / content names — for "who coined this" or "what show is this" questions
    "IShowSpeed","MrBeast","xQc","Dream","Ninja","Markiplier",
    "NPC Streams","Ohio Edits","Brainrot Clips","Subway Surfers Videos",
    // Slang terms — for questions where the answer itself is a slang word
    "brain rot","delulu","sigma","rizz","glazing","periodt","cooked","based",
    // Definition-style phrases — for the majority of "what does this mean?" questions
    "They're joking around or being sarcastic",
    "That's totally embarrassing",
    "They're extremely excited or hyped up",
    "They're completely confused or lost",
    "It's outdated and no longer cool",
    "They're showing off or bragging",
    "A close friend or loyal teammate",
    "They got caught doing something wrong",
    "They're trying too hard to fit in",
    "That makes absolutely no sense",
    "Someone who follows every trend mindlessly",
    "An expression of total disbelief",
    "They're being dramatic on purpose",
    "That's surprisingly impressive",
    "They're giving up entirely",
    "Something going viral right now",
    "They're secretly jealous of someone",
    "They refuse to participate or engage",
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

function generateChoices(correctAnswer, pool, customDistractors) {
  // Per-question custom distractors take priority when provided
  if (customDistractors && customDistractors.length >= 3) {
    return shuffle([correctAnswer, ...shuffle(customDistractors).slice(0, 3)]).map((text, i) => ({
      label: ["A", "B", "C", "D"][i],
      text,
      correct: text === correctAnswer,
    }));
  }
  const ca = correctAnswer.toLowerCase().trim();
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

  const buildGame = (customCats = null) => {
    const cats = customCats || shuffle(ALL_CATEGORIES).slice(0, 6);
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

  const startGame = (customCats = null) => {
    const { cats, questions } = buildGame(customCats);
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
    setTeams(prev => prev.map((t, i) => i === teamIdx ? { ...t, score: Math.max(0, t.score - pts) } : t));
  };

  const awardPointsOnly = (teamIdx, pts) => {
    sounds.correct();
    setTeams(prev => prev.map((t, i) => i === teamIdx ? { ...t, score: t.score + pts } : t));
  };

  const closeQuestion = (currentTeams = teams) => {
    setTeams(currentTeams);
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
        teams={teams} onClose={closeQuestion} multiChoice={multiChoice}
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
  const [catMode, setCatMode] = useState("random");
  const [pickedCats, setPickedCats] = useState([]);

  const toggleCat = (cat) => {
    setPickedCats(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : prev.length < 6 ? [...prev, cat] : prev
    );
  };

  const canStart = catMode === "random" || pickedCats.length === 6;

  const handleStart = () => {
    if (!canStart) return;
    onStart(catMode === "custom" ? pickedCats : null);
  };

  return (
    <div style={{ width:"100vw", height:"100vh", background:"#060b2e", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Oswald', sans-serif", overflowY:"auto" }}>
      <div style={{ position:"fixed", inset:0, background:"radial-gradient(ellipse at 50% 0%, #0d1f6e 0%, #060b2e 70%)", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:28, width:720, padding:"40px 0" }}>
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

          <div>
            <div style={{ color:"#7ec8e3", fontSize:14, letterSpacing:4, marginBottom:14 }}>CATEGORIES</div>
            <div style={{ display:"flex", gap:12, marginBottom: catMode === "custom" ? 16 : 0 }}>
              {[["RANDOM (6)", "random"], ["CHOOSE MINE", "custom"]].map(([label, mode]) => {
                const active = catMode === mode;
                return (
                  <button key={mode} onClick={() => { setCatMode(mode); setPickedCats([]); }}
                    style={{ flex:1, height:52, borderRadius:10, border: active ? "3px solid #ffd700" : "2px solid rgba(255,255,255,0.2)", background: active ? "rgba(255,215,0,0.15)" : "transparent", color: active ? "#ffd700" : "rgba(255,255,255,0.5)", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:2, transition:"all 0.2s" }}>
                    {label}
                  </button>
                );
              })}
            </div>

            {catMode === "custom" && (
              <div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8 }}>
                  {ALL_CATEGORIES.map(cat => {
                    const picked = pickedCats.includes(cat);
                    const disabled = !picked && pickedCats.length >= 6;
                    return (
                      <button key={cat} onClick={() => toggleCat(cat)}
                        disabled={disabled}
                        style={{
                          padding:"10px 8px", borderRadius:8, fontSize:13, fontWeight:600,
                          fontFamily:"'Oswald',sans-serif", letterSpacing:1, cursor: disabled ? "not-allowed" : "pointer",
                          transition:"all 0.15s", textAlign:"center", lineHeight:1.2,
                          border: picked ? "2px solid #ffd700" : "2px solid rgba(255,255,255,0.15)",
                          background: picked ? "rgba(255,215,0,0.18)" : "rgba(255,255,255,0.04)",
                          color: picked ? "#ffd700" : disabled ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.65)",
                          opacity: disabled ? 0.5 : 1,
                        }}>
                        {cat}
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop:12, textAlign:"center", fontSize:15, letterSpacing:3, color: pickedCats.length === 6 ? "#4ade80" : "#7ec8e3" }}>
                  {pickedCats.length} / 6 SELECTED{pickedCats.length === 6 ? " ✓" : ""}
                </div>
              </div>
            )}
          </div>

          <button onClick={handleStart} disabled={!canStart}
            style={{ marginTop:8, padding:"22px", background: canStart ? "linear-gradient(180deg,#ffd700,#c8a000)" : "rgba(255,255,255,0.08)", color: canStart ? "#060b2e" : "rgba(255,255,255,0.25)", border:"none", borderRadius:12, fontSize:26, fontWeight:700, letterSpacing:5, cursor: canStart ? "pointer" : "not-allowed", fontFamily:"'Oswald',sans-serif", boxShadow: canStart ? "0 4px 24px rgba(255,215,0,0.4)" : "none", transition:"all 0.2s" }}>
            {catMode === "custom" && pickedCats.length < 6 ? `CHOOSE ${6 - pickedCats.length} MORE` : "START GAME"}
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
function QuestionScreen({ q, selected, isDailyDouble, ddPhase, setDdPhase, revealed, setRevealed, teams, onClose, multiChoice }) {
  const [ddTeamIdx, setDdTeamIdx]     = useState(null);
  const [ddWager, setDdWager]         = useState(null);
  const [wagerInput, setWagerInput]   = useState("");
  const [wagerError, setWagerError]   = useState("");
  // null = no change (pass), "award" = correct, "deduct" = wrong
  const [teamDecision, setTeamDecision] = useState(() => teams.map(() => null));

  // Generate choices once on mount (stable for this question's lifetime)
  const [choices] = useState(() => {
    if (!multiChoice) return null;
    const pool = DISTRACTOR_POOLS[selected.cat] || [];
    return generateChoices(q.a, pool, q.d);
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

  const handleDone = () => {
    const newTeams = teams.map((t, i) => {
      if (teamDecision[i] === "award")  return { ...t, score: t.score + effectivePts };
      if (teamDecision[i] === "deduct") return { ...t, score: Math.max(0, t.score - effectivePts) };
      return t;
    });
    if (teamDecision.some(d => d === "award"))       sounds.correct();
    else if (teamDecision.some(d => d === "deduct")) sounds.wrong();
    onClose(newTeams);
  };

  const toggleDecision = (i, val) =>
    setTeamDecision(prev => { const n = [...prev]; n[i] = n[i] === val ? null : val; return n; });

  // ── MC buzz-in state (non-DD multiple-choice only) ──
  const [mcPhase, setMcPhase]               = useState("pick-team"); // "pick-team"|"answering"|"correct"|"closed"
  const [mcActiveTeam, setMcActiveTeam]     = useState(null);
  const [mcEliminated, setMcEliminated]     = useState([]);          // [{choiceIdx, teamIdx}]
  const [mcScoreDeltas, setMcScoreDeltas]   = useState(() => teams.map(() => 0));
  const [mcAnswerRevealed, setMcAnswerRevealed] = useState(false);

  const handleMcChoiceTap = (choiceIdx) => {
    if (mcPhase !== "answering") return;
    if (mcEliminated.some(e => e.choiceIdx === choiceIdx)) return;
    if (choices[choiceIdx].correct) {
      sounds.correct();
      setMcScoreDeltas(prev => { const n=[...prev]; n[mcActiveTeam] += selected.pts; return n; });
      setMcPhase("correct");
      setMcAnswerRevealed(true);
    } else {
      sounds.wrong();
      const newElim = [...mcEliminated, { choiceIdx, teamIdx: mcActiveTeam }];
      setMcEliminated(newElim);
      setMcScoreDeltas(prev => { const n=[...prev]; n[mcActiveTeam] -= selected.pts; return n; });
      const correctIdx = choices.findIndex(c => c.correct);
      const allNonCorrectGone = choices.every((_, i) => i === correctIdx || newElim.some(e => e.choiceIdx === i));
      if (allNonCorrectGone) { setMcPhase("closed"); setMcAnswerRevealed(true); }
      else { setMcActiveTeam(null); setMcPhase("pick-team"); }
    }
  };

  const handleMcClose = () => { setMcPhase("closed"); setMcAnswerRevealed(true); };

  const handleMcDone = () => {
    const newTeams = teams.map((t, i) => ({ ...t, score: Math.max(0, t.score + mcScoreDeltas[i]) }));
    onClose(newTeams);
  };

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
              {choices.map((choice, idx) => {
                const elimEntry      = isDailyDouble ? null : mcEliminated.find(e => e.choiceIdx === idx);
                const isElim         = !!elimEntry;
                const isRevealedCorrect = isDailyDouble ? (revealed && choice.correct) : (mcAnswerRevealed && choice.correct);
                const isRevealedWrong   = isDailyDouble ? (revealed && !choice.correct) : (mcAnswerRevealed && !choice.correct && !isElim);
                const isClickable    = !isDailyDouble && mcPhase === "answering" && !isElim && !mcAnswerRevealed;
                return (
                  <div key={choice.label}
                    onClick={() => isClickable && handleMcChoiceTap(idx)}
                    className={isClickable ? "reveal-hover" : ""}
                    style={{
                      background: isRevealedCorrect ? "linear-gradient(160deg,rgba(255,215,0,0.22),rgba(255,215,0,0.08))"
                                : isElim            ? "rgba(255,255,255,0.015)"
                                : isRevealedWrong   ? "rgba(255,255,255,0.02)"
                                                    : "linear-gradient(160deg,#0e2191,#091660)",
                      border: isRevealedCorrect ? "2px solid #ffd700"
                            : isElim            ? "2px solid rgba(244,63,94,0.22)"
                            : isRevealedWrong   ? "2px solid rgba(255,255,255,0.07)"
                            : isClickable       ? "2px solid rgba(255,215,0,0.5)"
                                                : "2px solid #1a3aab",
                      borderRadius:14, padding:"16px 24px",
                      display:"flex", alignItems:"center", gap:18, position:"relative",
                      transition:"border 0.25s, background 0.25s",
                      boxShadow: isRevealedCorrect ? "0 0 20px rgba(255,215,0,0.25)" : "none",
                      opacity: isElim ? 0.38 : isRevealedWrong ? 0.32 : 1,
                      cursor: isClickable ? "pointer" : "default",
                    }}>
                    <span style={{ fontSize:30, fontWeight:700, flexShrink:0, minWidth:34,
                      color: isRevealedCorrect ? "#ffd700" : isElim ? "#f43f5e" : isRevealedWrong ? "rgba(255,255,255,0.18)" : "#ffd700" }}>
                      {isElim ? "✗" : choice.label}
                    </span>
                    <span style={{ fontSize:24, lineHeight:1.3, textTransform:"uppercase",
                      color: isRevealedCorrect ? "#ffd700" : isElim ? "rgba(255,255,255,0.28)" : isRevealedWrong ? "rgba(255,255,255,0.18)" : "white",
                      fontWeight: isRevealedCorrect ? 600 : 400,
                      textDecoration: isElim ? "line-through" : "none" }}>
                      {choice.text}
                    </span>
                    {isElim && elimEntry && (
                      <span style={{ position:"absolute", right:14, top:7, fontSize:10, letterSpacing:2, color:TEAM_COLORS[elimEntry.teamIdx], opacity:0.8 }}>
                        {teams[elimEntry.teamIdx].name.toUpperCase()}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Standard answer box — open-answer mode only */}
          {!multiChoice && revealed && (
            <div style={{ width:"100%", maxWidth:1400, background:"rgba(255,215,0,0.08)", border:"3px solid #ffd700", borderRadius:16, padding:"28px 60px", marginBottom:32, textAlign:"center", animation:"answerReveal 0.3s ease", transformOrigin:"top" }}>
              <div style={{ fontSize:13, color:"#ffd700", letterSpacing:5, marginBottom:10 }}>ANSWER</div>
              <div style={{ fontSize:42, color:"white", fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>{q.a}</div>
            </div>
          )}

          {/* Controls */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, width:"100%", maxWidth:1400 }}>
            {multiChoice && !isDailyDouble ? (
              /* ── MC buzz-in flow ── */
              <>
                {mcPhase === "pick-team" && (
                  <>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,0.35)", letterSpacing:4 }}>
                      {mcEliminated.length > 0 ? "WHICH TEAM ANSWERS NEXT?" : "WHICH TEAM IS ANSWERING?"}
                    </div>
                    <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
                      {teams.map((t, i) => (
                        <button key={i} onClick={() => { setMcActiveTeam(i); setMcPhase("answering"); }} className="award-hover"
                          style={{ padding:"16px 32px", background:TEAM_BG[i], border:`2px solid ${TEAM_COLORS[i]}`, borderRadius:12, color:TEAM_COLORS[i], fontSize:18, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s", minWidth:160 }}>
                          {t.name}
                          <span style={{ display:"block", fontSize:13, color:"rgba(255,255,255,0.4)", fontWeight:400, letterSpacing:2 }}>{dollar(t.score)}</span>
                        </button>
                      ))}
                    </div>
                    <button onClick={handleMcClose}
                      style={{ marginTop:2, padding:"10px 36px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.38)", borderRadius:10, fontSize:13, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s" }}>
                      CLOSE — REVEAL ANSWER
                    </button>
                  </>
                )}

                {mcPhase === "answering" && (
                  <>
                    <div style={{ fontSize:16, color:TEAM_COLORS[mcActiveTeam], letterSpacing:4, fontWeight:700 }}>
                      {teams[mcActiveTeam].name.toUpperCase()} — TAP THEIR ANSWER ABOVE
                    </div>
                    <div style={{ display:"flex", gap:10 }}>
                      <button onClick={() => { setMcActiveTeam(null); setMcPhase("pick-team"); }}
                        style={{ padding:"10px 24px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.38)", borderRadius:10, fontSize:13, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s" }}>
                        ← CHANGE TEAM
                      </button>
                      <button onClick={handleMcClose}
                        style={{ padding:"10px 24px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.38)", borderRadius:10, fontSize:13, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s" }}>
                        CLOSE — REVEAL ANSWER
                      </button>
                    </div>
                  </>
                )}

                {(mcPhase === "correct" || mcPhase === "closed") && (
                  <>
                    {mcPhase === "correct" ? (
                      <div style={{ fontSize:18, color:"#22c55e", letterSpacing:4, fontWeight:700 }}>
                        {teams[mcActiveTeam].name.toUpperCase()} GOT IT RIGHT!
                      </div>
                    ) : (
                      <div style={{ fontSize:13, color:"rgba(255,255,255,0.35)", letterSpacing:4 }}>QUESTION CLOSED</div>
                    )}
                    {mcScoreDeltas.some(d => d !== 0) && (
                      <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
                        {mcScoreDeltas.map((delta, i) => delta !== 0 && (
                          <span key={i} style={{ fontSize:15, letterSpacing:2, fontWeight:700, color: delta > 0 ? "#22c55e" : "#f43f5e" }}>
                            {delta > 0 ? `+${dollar(delta)}` : `-${dollar(Math.abs(delta))}`} {teams[i].name}
                          </span>
                        ))}
                      </div>
                    )}
                    <button onClick={handleMcDone} className="reveal-hover"
                      style={{ padding:"16px 56px", background:"rgba(255,255,255,0.08)", border:"2px solid rgba(255,255,255,0.2)", color:"white", borderRadius:12, fontSize:18, fontWeight:700, letterSpacing:4, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s" }}>
                      DONE — BACK TO BOARD
                    </button>
                  </>
                )}
              </>
            ) : (
              /* ── Open-answer / Daily Double flow ── */
              !revealed ? (
                <button onClick={() => { sounds.revealAnswer(); setRevealed(true); }} className="reveal-hover"
                  style={{ padding:"24px 120px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:26, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", transition:"all 0.15s" }}>
                  REVEAL ANSWER
                </button>
              ) : (
                <>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.35)", letterSpacing:4 }}>SCORE THIS QUESTION</div>
                  <div style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center", width:"100%" }}>
                    {(isDailyDouble ? [{ team: teams[ddTeamIdx], idx: ddTeamIdx }] : teams.map((team, idx) => ({ team, idx }))).map(({ team: t, idx: i }) => {
                      const dec = teamDecision[i];
                      return (
                        <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, padding:"18px 20px", background:TEAM_BG[i], border:`2px solid ${TEAM_COLORS[i]}`, borderRadius:14, minWidth:200, flex:1, maxWidth:300 }}>
                          <div style={{ fontSize:15, color:TEAM_COLORS[i], letterSpacing:3 }}>{t.name.toUpperCase()}</div>
                          <div style={{ fontSize:22, fontWeight:700, color:"white", fontVariantNumeric:"tabular-nums" }}>{dollar(t.score)}</div>
                          <div style={{ display:"flex", gap:7 }}>
                            <button onClick={() => toggleDecision(i, "award")}
                              style={{ padding:"10px 12px", background: dec==="award" ? "rgba(34,197,94,0.32)" : "rgba(34,197,94,0.07)", border: dec==="award" ? "2px solid #22c55e" : "2px solid rgba(34,197,94,0.22)", borderRadius:10, color: dec==="award" ? "#22c55e" : "rgba(34,197,94,0.45)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:1, transition:"all 0.15s", lineHeight:1.4 }}>
                              +{dollar(effectivePts)}<br/><span style={{fontSize:10}}>CORRECT</span>
                            </button>
                            <button onClick={() => setTeamDecision(prev => { const n=[...prev]; n[i]=null; return n; })}
                              style={{ padding:"10px 12px", background: dec===null ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)", border: dec===null ? "2px solid rgba(255,255,255,0.35)" : "2px solid rgba(255,255,255,0.08)", borderRadius:10, color: dec===null ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.22)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:1, transition:"all 0.15s", lineHeight:1.4 }}>
                              NO<br/><span style={{fontSize:10}}>CHANGE</span>
                            </button>
                            <button onClick={() => toggleDecision(i, "deduct")}
                              style={{ padding:"10px 12px", background: dec==="deduct" ? "rgba(244,63,94,0.32)" : "rgba(244,63,94,0.07)", border: dec==="deduct" ? "2px solid #f43f5e" : "2px solid rgba(244,63,94,0.22)", borderRadius:10, color: dec==="deduct" ? "#f43f5e" : "rgba(244,63,94,0.45)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", letterSpacing:1, transition:"all 0.15s", lineHeight:1.4 }}>
                              -{dollar(effectivePts)}<br/><span style={{fontSize:10}}>WRONG</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button onClick={handleDone} className="reveal-hover"
                    style={{ marginTop:6, padding:"16px 56px", background:"rgba(255,255,255,0.08)", border:"2px solid rgba(255,255,255,0.2)", color:"white", borderRadius:12, fontSize:18, fontWeight:700, letterSpacing:4, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s" }}>
                    DONE — BACK TO BOARD
                  </button>
                </>
              )
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
            <div style={{ fontSize:32, color:"white", fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>{question.a}</div>
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
