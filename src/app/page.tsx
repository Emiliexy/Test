'use client';

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import toast from 'react-hot-toast';
import Link from 'next/link';

type SutraType = 'heart' | 'universal-gate' | 'great-compassion';

interface SutraContent {
  title: string;
  content: string[];
  duration: string;
}

const sutras: Record<SutraType, SutraContent> = {
  'heart': {
    title: '般若波罗蜜多心经',
    content: [
      '观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。',
      '舍利子，色不异空，空不异色，色即是空，空即是色，受想行识，亦复如是。',
      '舍利子，是诸法空相，不生不灭，不垢不净，不增不减。是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界乃至无意识界。',
      '无无明，亦无无明尽，乃至无老死，亦无老死尽。无苦集灭道，无智亦无得。',
      '以无所得故，菩提萨埵，依般若波罗蜜多故，心无挂碍。无挂碍故，无有恐怖，远离颠倒梦想，究竟涅槃。',
      '三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。',
      '故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒，能除一切苦，真实不虚。',
      '故说般若波罗蜜多咒，即说咒曰：揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。'
    ],
    duration: '03:44'
  },
  'universal-gate': {
    title: '妙法莲华经・观世音菩萨普门品',
    content: [
      '尔时，无尽意菩萨即从座起，偏袒右肩，合掌向佛，而作是言："世尊，观世音菩萨以何因缘，名观世音？"',
      '佛告无尽意菩萨："善男子，若有无量百千万亿众生，受诸苦恼，闻是观世音菩萨，一心称名，观世音菩萨即时观其音声，皆得解脱。',
      '若有持是观世音菩萨名者，设入大火，火不能烧；若为大水所漂，称其名号，即得浅处。',
      '若有百千万亿众生，为求金、银、琉璃、砗磲、玛瑙、珊瑚、琥珀、真珠等宝，入于大海，假使黑风吹其船舫，飘堕罗刹鬼国，其中若有乃至一人，称观世音菩萨名者，是诸人等，皆得解脱罗刹之难。以是因缘，名观世音。',
      '若复有人，临当被害，称观世音菩萨名者，彼所执刀杖，寻段段坏，而得解脱。',
      '若三千大千国土，满中夜叉、罗刹，欲来恼人，闻其称观世音菩萨名者，是诸恶鬼，尚不能以恶眼视之，况复加害？',
      '设复有人，若有罪、若无罪，杻械、枷锁检系其身，称观世音菩萨名者，皆悉断坏，即得解脱。',
      '若三千大千国土，满中怨贼，有一商主，将诸商人，赍持重宝，经过险路，其中一人作是唱言："诸善男子，勿得恐怖！汝等应当一心称观世音菩萨名号，是菩萨能以无畏施于众生，汝等若称名者，于此怨贼，当得解脱。"众商人闻，俱发声言："南无观世音菩萨"。称其名故，即得解脱。',
      '无尽意，观世音菩萨摩诃萨，威神之力，巍巍如是。若有众生多于淫欲，常念恭敬观世音菩萨，便得离欲；若多嗔恚，常念恭敬观世音菩萨，便得离嗔；若多愚痴，常念恭敬观世音菩萨，便得离痴。',
      '无尽意，观世音菩萨有如是等大威神力，多所饶益，是故众生常应心念。若有女人，设欲求男，礼拜供养观世音菩萨，便生福德智慧之男；设欲求女，便生端正有相之女，宿植德本，众人爱敬。',
      '无尽意，观世音菩萨有如是力，若有众生恭敬礼拜观世音菩萨，福不唐捐。是故众生皆应受持观世音菩萨名号。',
      '无尽意，若有人受持六十二亿恒河沙菩萨名字，复尽形供养饮食、衣服、卧具、医药，于汝意云何？是善男子、善女人功德多不？"',
      '无尽意言："甚多，世尊。"',
      '佛言："若复有人受持观世音菩萨名号，乃至一时礼拜供养，是二人福德正等无异。于百千万亿劫不可穷尽。无尽意，受持观世音菩萨名号，得如是无量无边福德之利。"',
      '无尽意菩萨白佛言："世尊，观世音菩萨云何游此娑婆世界？云何而为众生说法？方便之力，其事云何？"',
      '佛告无尽意菩萨："善男子，若有国土众生，应以佛身得度者，观世音菩萨即现佛身而为说法；应以辟支佛身得度者，即现辟支佛身而为说法；应以声闻身得度者，即现声闻身而为说法；应以梵王身得度者，即现梵王身而为说法；应以帝释身得度者，即现帝释身而为说法；应以自在天身得度者，即现自在天身而为说法；应以大自在天身得度者，即现大自在天身而为说法；应以天大将军身得度者，即现天大将军身而为说法；应以毗沙门身得度者，即现毗沙门身而为说法；应以小王身得度者，即现小王身而为说法；应以长者身得度者，即现长者身而为说法；应以居士身得度者，即现居士身而为说法；应以宰官身得度者，即现宰官身而为说法；应以婆罗门身得度者，即现婆罗门身而为说法；应以比丘、比丘尼、优婆塞、优婆夷身得度者，即现比丘、比丘尼、优婆塞、优婆夷身而为说法；应以长者、居士、宰官、婆罗门妇女身得度者，即现妇女身而为说法；应以童男、童女身得度者，即现童男、童女身而为说法；应以天、龙、夜叉、乾闼婆、阿修罗、迦楼罗、紧那罗、摩睺罗伽、人非人等身得度者，即皆现之而为说法；应以执金刚神得度者，即现执金刚神而为说法。"',
      '无尽意，是观世音菩萨成就如是功德，以种种形，游诸国土，度脱众生。是故汝等应当一心供养观世音菩萨。是观世音菩萨摩诃萨，于怖畏急难之中，能施无畏，是故此娑婆世界，皆号之为施无畏者。',
      '无尽意菩萨白佛言："世尊，我今当供养观世音菩萨。"即解颈众宝珠璎珞，价值百千两金，而以与之，作是言："仁者，受此法施珍宝璎珞。"',
      '时观世音菩萨不肯受之。',
      '无尽意复白观世音菩萨言："仁者，愍我等故，受此璎珞。"',
      '尔时，佛告观世音菩萨："当愍此无尽意菩萨及四众、天、龙、夜叉、乾闼婆、阿修罗、迦楼罗、紧那罗、摩睺罗伽、人非人等故，受是璎珞。"',
      '即时观世音菩萨愍诸四众及于天、龙、人非人等，受其璎珞，分作二分：一分奉释迦牟尼佛，一分奉多宝佛塔。',
      '"无尽意，观世音菩萨有如是自在神力，游于娑婆世界。"',
      '尔时，无尽意菩萨以偈问曰：\n"世尊妙相具，我今重问彼：\n佛子何因缘，名为观世音？"',
      '具足妙相尊，偈答无尽意：\n"汝听观音行，善应诸方所，\n弘誓深如海，历劫不思议，\n侍多千亿佛，发大清净愿。"',
      '"我为汝略说，闻名及见身，\n心念不空过，能灭诸有苦。\n假使兴害意，推落大火坑，\n念彼观音力，火坑变成池。"',
      '"或漂流巨海，龙鱼诸鬼难，\n念彼观音力，波浪不能没。\n或在须弥峰，为人所推堕，\n念彼观音力，如日虚空住。"',
      '"或被恶人逐，堕落金刚山，\n念彼观音力，不能损一毛。\n或值怨贼绕，各执刀加害，\n念彼观音力，咸即起慈心。"',
      '"或遭王难苦，临刑欲寿终，\n念彼观音力，刀寻段段坏。\n或囚禁枷锁，手足被杻械，\n念彼观音力，释然得解脱。"',
      '"咒诅诸毒药，所欲害身者，\n念彼观音力，还著于本人。\n或遇恶罗刹，毒龙诸鬼等，\n念彼观音力，时悉不敢害。"',
      '"若恶兽围绕，利牙爪可怖，\n念彼观音力，疾走无边方。\n蚖蛇及蝮蝎，气毒烟火然，\n念彼观音力，寻声自回去。"',
      '"云雷鼓掣电，降雹澍大雨，\n念彼观音力，应时得消散。\n众生被困厄，无量苦逼身，\n观音妙智力，能救世间苦。"',
      '"具足神通力，广修智方便，\n十方诸国土，无刹不现身。\n种种诸恶趣，地狱鬼畜生，\n生老病死苦，以渐悉令灭。"',
      '"真观清净观，广大智慧观，\n悲观及慈观，常愿常瞻仰。\n无垢清净光，慧日破诸暗，\n能伏灾风火，普明照世间。"',
      '"悲体戒雷震，慈意妙大云，\n澍甘露法雨，灭除烦恼焰。\n诤讼经官处，怖畏军阵中，\n念彼观音力，众怨悉退散。"',
      '"妙音观世音，梵音海潮音，\n胜彼世间音，是故须常念。\n念念勿生疑，观世音净圣，\n于苦恼死厄，能为作依怙。"',
      '"具一切功德，慈眼视众生，\n福聚海无量，是故应顶礼。"',
      '尔时持地菩萨即从座起，前白佛言："世尊，若有众生闻是观世音菩萨品，自在之业，普门示现神通力者，当知是人功德不少。"',
      '佛说是普门品时，众中八万四千众生，皆发无等等阿耨多罗三藐三菩提心。'
    ],
    duration: '05:21'
  },
  'great-compassion': {
    title: '千手千眼观世音菩萨广大圆满无碍大悲心陀罗尼',
    content: [
      '南无、喝啰怛那、哆啰夜耶，南无、阿唎耶，婆卢羯帝、烁钵啰耶，菩提萨埵婆耶，摩诃萨埵婆耶，摩诃、迦卢尼迦耶，唵，萨皤啰罚曳，数怛那怛写，南无、悉吉栗埵、伊蒙阿唎耶，婆卢吉帝、室佛啰楞驮婆，南无、那啰谨墀，醯利摩诃、皤哆沙咩，萨婆阿他、豆输朋，阿逝孕，萨婆萨哆、那摩婆萨哆，那摩婆伽，摩罚特豆。',
      '怛侄他。唵，阿婆卢醯。卢迦帝。迦罗帝。夷醯唎。摩诃菩提萨埵，萨婆萨婆。摩啰摩啰，摩醯摩醯、唎驮孕。俱卢俱卢、羯蒙。度卢度卢、罚阇耶帝。摩诃罚阇耶帝。陀啰陀啰。地唎尼。室佛啰耶。遮啰遮啰。摩么罚摩啰。穆帝隶。伊醯伊醯。室那室那。阿啰参、佛啰舍利。罚沙罚参。佛啰舍耶。呼嚧呼嚧摩啰。呼嚧呼嚧醯利。娑啰娑啰，悉唎悉唎。苏嚧苏嚧。',
      '菩提夜、菩提夜。菩驮夜、菩驮夜。弥帝唎夜。那啰谨墀。地利瑟尼那。婆夜摩那。娑婆诃。悉陀夜。娑婆诃。摩诃悉陀夜。娑婆诃。悉陀喻艺。室皤啰耶。娑婆诃。那啰谨墀。娑婆诃。摩啰那啰。娑婆诃。悉啰僧、阿穆佉耶，娑婆诃。娑婆摩诃、阿悉陀夜。娑婆诃。者吉啰、阿悉陀夜。娑婆诃。波陀摩、羯悉陀夜。娑婆诃。那啰谨墀、皤伽啰耶。娑婆诃。摩婆利、胜羯啰夜。娑婆诃。',
      '南无、喝啰怛那、哆啰夜耶，南无、阿唎耶。婆嚧吉帝。烁皤啰夜。娑婆诃。唵，悉殿都。漫多啰。跋陀耶，娑婆诃。',
      '回向偈：',
      '愿以此功德，庄严佛净土；\n上报四重恩，下济三途苦；\n若有见闻者，悉发菩提心；\n尽此一报身，同生极乐国。',
      '愿消三障诸烦恼，愿得智慧真明了，\n普愿罪障悉消除，世世常行菩萨道。',
      '愿以此功德，回向弟子眷属合家吉祥安康;\n人疾病早日康复;人事业有成;\n回向弟子历代先祖、冤亲债主，离苦得乐。',
      '最后礼观音菩萨三拜'
    ],
    duration: '10:33'
  }
};

const dailyBuddhismSayings = [
  "放下执着，迎接自在",
  "心若无尘，处处光明",
  "慈悲喜舍，净化人心",
  "随缘不变，随变不惊",
  "心安即是功德",
  "诚心诚意，菩萨保佑",
  "心净则国土净",
  "以慈悲心，度化众生",
  "心中有佛，处处光明",
  "随心自在，随缘放下"
];

// 添加敏感词列表
const sensitiveWords = [
  '政治', '色情', '赌博', '毒品', '暴力', 
  '诈骗', '邪教', '迷信', '谩骂', '歧视',
  '反动', '违法', '犯罪', '恐怖', '黄赌毒',
  '传销', '邪门', '歪道', '黑社会'
];

// 检查文本是否包含敏感词
const containsSensitiveWords = (text: string): boolean => {
  return sensitiveWords.some(word => text.includes(word));
};

const getDailyIndex = () => {
  const today = new Date();
  return (today.getFullYear() * 10000 + 
          (today.getMonth() + 1) * 100 + 
          today.getDate()) % dailyBuddhismSayings.length;
};

interface Wish {
  text: string;
  timestamp: string;
}

export default function Home() {
  const [prayText, setPrayText] = useState('');
  const [isGlowing, setIsGlowing] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [pressTimer, setPressTimer] = useState(0);
  const [completedWishes, setCompletedWishes] = useState<Wish[]>([]);
  const pressTimeout = useRef<NodeJS.Timeout | null>(null);
  const pressInterval = useRef<NodeJS.Timeout | null>(null);
  const maxLength = 66;
  const requiredPressTime = 5; // 秒
  const [currentSutra, setCurrentSutra] = useState<SutraType>('heart');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInitialized = useRef(false);

  // 从localStorage加载已保存的心愿
  useEffect(() => {
    if (typeof window !== 'undefined' && !hasInitialized.current) {
      const savedWishes = localStorage.getItem('completedWishes');
      if (savedWishes) {
        try {
          const parsedWishes = JSON.parse(savedWishes);
          setCompletedWishes(parsedWishes);
        } catch (error) {
          console.error('Error parsing saved wishes:', error);
        }
      }
      hasInitialized.current = true;
    }
  }, []);

  // 保存心愿到localStorage
  const saveWishesToStorage = (wishes: Wish[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('completedWishes', JSON.stringify(wishes));
      } catch (error) {
        console.error('Error saving wishes:', error);
      }
    }
  };

  // 处理音频播放暂停
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 处理经文切换
  const handleSutraChange = (sutra: SutraType) => {
    setCurrentSutra(sutra);
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // 更新音频时间
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // 格式化时间
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 音频结束处理
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  // 处理文本输入变化
  const handlePrayTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (containsSensitiveWords(newText)) {
      toast.error('请文明祈愿，不要包含不当词汇');
      return;
    }
    setPrayText(newText);
  };

  // 处理长按开始
  const handlePressStart = (withPrayer: boolean) => {
    if (withPrayer) {
      if (!prayText.trim()) {
        toast.error('请先填写祈愿');
        return;
      }
      if (containsSensitiveWords(prayText)) {
        toast.error('祈愿内容包含不当词汇，请修改后重试');
        return;
      }
    }

    setIsPressing(true);
    setPressTimer(0);

    // 开始计时
    pressTimeout.current = setTimeout(() => {
      setIsGlowing(true);
      toast.success('祈愿完成，愿菩萨保佑🙏！');
      
      // 如果是带祈愿的，添加到已完成心愿列表
      if (withPrayer && prayText.trim()) {
        const now = new Date();
        const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const newWishes = [{
          text: prayText,
          timestamp
        }, ...completedWishes].slice(0, 10); // 只保留最新的10条
        setCompletedWishes(newWishes);
        saveWishesToStorage(newWishes); // 保存到localStorage
        setPrayText(''); // 清空输入框
      }

      setTimeout(() => setIsGlowing(false), 2000);
      handlePressEnd();
    }, requiredPressTime * 1000);

    // 更新计时器显示
    pressInterval.current = setInterval(() => {
      setPressTimer(prev => prev + 1);
    }, 1000);

    // 显示默念提示
    toast('请默念：南无大慈大悲观世音菩萨', {
      duration: requiredPressTime * 1000,
      icon: '🙏',
    });
  };

  // 处理长按结束
  const handlePressEnd = () => {
    if (pressTimeout.current) {
      clearTimeout(pressTimeout.current);
    }
    if (pressInterval.current) {
      clearInterval(pressInterval.current);
    }
    if (isPressing && pressTimer < requiredPressTime) {
      toast.error('请长按5秒完成礼佛');
    }
    setIsPressing(false);
    setPressTimer(0);
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (pressTimeout.current) clearTimeout(pressTimeout.current);
      if (pressInterval.current) clearInterval(pressInterval.current);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="content-container pt-16" id="home">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          {/* 左侧主要内容区域 */}
          <div className="lg:col-span-2">
            {/* 礼拜观音模块 */}
            <section className="py-6" id="worship">
              <div className="bg-light-gold rounded-lg overflow-hidden shadow-lg">
                {/* 标题区域 */}
                <div className="relative h-16 bg-light-gold border-b border-primary-gold/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-2xl font-kai text-burgundy font-bold">礼拜观音</h1>
                  </div>
                  {/* 装饰性图案 */}
                  <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-burgundy to-transparent opacity-30"></div>
                </div>

                <div className="p-6 bg-light-gold/50">
                  <div className="mb-6">
                    <div className={`relative w-full aspect-video transition-all duration-1000 ${isGlowing ? 'glow' : ''}`}>
        <Image
                        src="/images/guanyin.jpg"
                        alt="观世音菩萨圣像"
                        fill
                        className={`object-cover rounded-lg shadow-md transition-all duration-1000 
                                  ${isGlowing ? 'brightness-125 contrast-75' : ''}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
                      {isGlowing && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/20 via-white/40 to-primary-gold/20 
                                      animate-shine rounded-lg"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <textarea
                        className="w-full h-32 p-4 rounded-lg bg-white bg-opacity-50 text-dark-brown 
                                  font-song text-lg italic placeholder:text-gray-500 placeholder:italic
                                  focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-opacity-50
                                  resize-none"
                        placeholder="南无大慈大悲观世音菩萨，弟子在此虔诚祈愿..."
                        maxLength={maxLength}
                        value={prayText}
                        onChange={handlePrayTextChange}
                      />
                      <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                        {prayText.length}/{maxLength}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                      <div className="flex flex-col space-y-2">
                        <button
                          className={`btn-primary whitespace-nowrap relative overflow-hidden
                                    ${isPressing ? 'pressing' : ''}`}
                          onMouseDown={() => handlePressStart(true)}
                          onMouseUp={handlePressEnd}
                          onMouseLeave={handlePressEnd}
                          onTouchStart={() => handlePressStart(true)}
                          onTouchEnd={handlePressEnd}
                        >
                          <span className="relative z-10">祈愿行拜礼</span>
                          {isPressing && (
                            <div
                              className="absolute bottom-0 left-0 h-full bg-burgundy/30"
                              style={{ width: `${(pressTimer / requiredPressTime) * 100}%` }}
                            ></div>
                          )}
                        </button>
                        {isPressing && (
                          <div className="text-center text-sm text-burgundy font-song">
                            请继续按住 {requiredPressTime - pressTimer} 秒
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          className={`btn-secondary whitespace-nowrap relative overflow-hidden
                                    ${isPressing ? 'pressing' : ''}`}
                          onMouseDown={() => handlePressStart(false)}
                          onMouseUp={handlePressEnd}
                          onMouseLeave={handlePressEnd}
                          onTouchStart={() => handlePressStart(false)}
                          onTouchEnd={handlePressEnd}
                        >
                          <span className="relative z-10">直接行拜礼</span>
                          {isPressing && (
                            <div
                              className="absolute bottom-0 left-0 h-full bg-deep-gold/30"
                              style={{ width: `${(pressTimer / requiredPressTime) * 100}%` }}
                            ></div>
                          )}
                        </button>
                        {isPressing && (
                          <div className="text-center text-sm text-deep-gold font-song">
                            请继续按住 {requiredPressTime - pressTimer} 秒
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 诵经念佛模块 */}
            <section className="py-6 bg-light-gold bg-opacity-60 paper-texture" id="sutra">
              <div className="max-w-3xl mx-auto">
                {/* 标题区域 */}
                <div className="relative h-16 bg-light-gold border-b border-primary-gold/30 rounded-t-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-2xl font-kai text-burgundy font-bold">诵经念佛</h1>
                  </div>
                  {/* 装饰性图案 */}
                  <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-burgundy to-transparent opacity-30"></div>
                </div>

                <div className="bg-light-gold bg-opacity-60 rounded-b-lg shadow-lg px-4 py-6">
                  {/* 经文选择按钮组 */}
                  <div className="flex justify-center space-x-4 mb-8">
                    <button 
                      className={`px-6 py-2 rounded-full text-white hover:bg-opacity-90 transition-colors
                                ${currentSutra === 'heart' ? 'bg-burgundy' : 'bg-dark-brown'}`}
                      onClick={() => handleSutraChange('heart')}
                    >
                      心经
                    </button>
                    <button 
                      className={`px-6 py-2 rounded-full text-white hover:bg-opacity-90 transition-colors
                                ${currentSutra === 'universal-gate' ? 'bg-burgundy' : 'bg-dark-brown'}`}
                      onClick={() => handleSutraChange('universal-gate')}
                    >
                      普门品
                    </button>
                    <button 
                      className={`px-6 py-2 rounded-full text-white hover:bg-opacity-90 transition-colors
                                ${currentSutra === 'great-compassion' ? 'bg-burgundy' : 'bg-dark-brown'}`}
                      onClick={() => handleSutraChange('great-compassion')}
                    >
                      大悲咒
                    </button>
                  </div>

                  <h2 className="text-3xl font-bold text-center mb-8 font-song text-dark-brown">
                    {sutras[currentSutra].title}
                  </h2>
                  <div className="max-w-2xl mx-auto">
                    <div className="prose prose-lg h-[400px] overflow-y-auto pr-4 custom-scrollbar bg-bg-cream rounded-lg p-4">
                      {sutras[currentSutra].content.map((paragraph, index) => (
                        <p key={index} className="indent-8 text-dark-brown font-song leading-loose mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {/* 音频控件 */}
                    <div className="mt-8 flex justify-center items-center space-x-4">
                      <button 
                        className="rounded-full bg-primary-gold p-3 text-white hover:bg-deep-gold transition-colors"
                        onClick={togglePlay}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {isPlaying ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          )}
                        </svg>
                      </button>
                      <span className="text-gray-600 font-song">
                        {formatTime(currentTime)} / {sutras[currentSutra].duration}
                      </span>
                      <audio
                        ref={audioRef}
                        src={`/audio/${
                          currentSutra === 'heart' 
                            ? 'heart-sutra.mp3' 
                            : currentSutra === 'universal-gate'
                              ? 'pumen-pin.mp3'
                              : 'dabeizhou.mp3'
                        }`}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleAudioEnded}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 右侧边栏 */}
          <div className="lg:py-12">
            {/* 用户心愿展示台 */}
            <div className="mb-6">
              <div className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden">
                <div className="p-3 border-b border-primary-gold/20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-burgundy font-kai">祈愿台</h2>
                    <div>
            <Image
                        src="/images/lotus-icon.svg"
                        alt="莲花图标"
              width={20}
              height={20}
                        className="text-deep-gold"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  {completedWishes.length === 0 ? (
                    <p className="text-center text-gray-500 font-song py-4">暂无心愿</p>
                  ) : (
                    <div className="space-y-3 h-[250px] overflow-y-auto custom-scrollbar pr-2">
                      {completedWishes.map((wish, index) => (
                        <div key={index} className="bg-light-gold/20 p-3 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Image
                              src="/images/lotus-icon.svg"
                              alt="莲花图标"
                              width={16}
                              height={16}
                              className="mt-1 text-deep-gold"
                            />
                            <div className="flex-1">
                              <p className="text-dark-brown font-song mb-1 line-clamp-2">{wish.text}</p>
                              <p className="text-right text-sm text-gray-500">{wish.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 今日佛学小语 */}
            <div className="sticky top-4">
              <div className="aspect-[2/1] bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-full flex flex-col">
                  <div className="p-3 border-b border-primary-gold/20">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-burgundy font-kai">今日佛学小语</h2>
                      <div className="flex items-center space-x-2">
                        <button 
                          className="text-primary-gold hover:text-deep-gold transition-colors"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: '今日佛学小语',
                                text: dailyBuddhismSayings[getDailyIndex()],
                              });
                            }
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </button>
                        <div>
                          <svg className="w-5 h-5 text-primary-gold animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm0-3a5 5 0 110-10 5 5 0 010 10z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-primary-gold/10 p-4 flex items-center justify-center group hover:bg-primary-gold/15 transition-all duration-300">
                    <div className="transform group-hover:scale-105 transition-transform duration-300">
                      <p className="text-center text-lg font-song text-dark-brown">
                        {dailyBuddhismSayings[getDailyIndex()]}
                      </p>
                      <div className="decorative-line opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 佛法修行指南 */}
        <section className="py-12" id="dharma">
          <h2 className="section-title font-kai">佛法修行指南</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 新增：祈愿文文章卡片 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="relative aspect-[4/3] rounded-t-lg overflow-hidden">
                <Image
                  src="/images/blog/prayerthanks/guanyin-prayer-guide.jpg"
                  alt="普陀山-南海观音像"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-burgundy mb-3 font-kai">向观音菩萨祈求庇佑的请愿文、还愿文与回向偈怎么讲？</h3>
                <p className="text-dark-brown mb-4 line-clamp-3 font-song">在佛教信仰中，观音菩萨被视为"大悲菩萨"，她广受信徒的尊敬与崇拜，象征着无私的慈悲与救赎。无论是生活中的困境、健康的忧虑，还是心灵的痛苦，信徒们都会向观音菩萨虔诚祈愿...</p>
                <div className="flex justify-end">
                  <Link 
                    href="/blog/prayer-thanksgiving-dedication-to-guanyin" 
                    className="inline-flex items-center text-burgundy hover:text-deep-gold transition-colors font-kai"
                  >
                    阅读全文
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* 求观世音菩萨庇佑文章卡片 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="relative aspect-[4/3] rounded-t-lg overflow-hidden">
          <Image
                  src="/images/blog/seekguanyin/guanyin-temple.jpg"
                  alt="信众向观音菩萨祈愿"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-burgundy mb-3 font-kai">如何求观世音菩萨庇佑？完整祈愿指南</h3>
                <p className="text-dark-brown mb-4 line-clamp-3 font-song">观世音菩萨，以"大悲菩萨"之名，广受世界各地佛教信徒的尊敬与崇拜。她是佛教中最具慈悲心的菩萨之一，象征着无私的救赎与无限的关怀...</p>
                <div className="flex justify-end">
                  <Link 
                    href="/blog/how-to-seek-guanyin-bodhisattva-blessings" 
                    className="inline-flex items-center text-burgundy hover:text-deep-gold transition-colors font-kai"
                  >
                    阅读全文
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* 观音诞拜拜文章卡片 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="relative aspect-[4/3] rounded-t-lg overflow-hidden">
          <Image
                  src="/images/blog/guanyindan/guanyin-offerings.jpg"
                  alt="观音诞祭品"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-burgundy mb-3 font-kai">观音诞如何拜拜？详细指南与习俗解读</h3>
                <p className="text-dark-brown mb-4 line-clamp-3 font-song">观音诞是指纪念观世音菩萨的诞生、成道及涅槃的节日。在中国，尤其是在一些佛教文化盛行的地方，观音诞被视为一个重要的宗教节日。不同地区的信徒会在这一天举行各种形式的拜祭活动...</p>
                <div className="flex justify-end">
                  <Link 
                    href="/blog/guanyin-dan-bai-bai-zheng-que-fang-shi" 
                    className="inline-flex items-center text-burgundy hover:text-deep-gold transition-colors font-kai"
                  >
                    阅读全文
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* 观音菩萨文章卡片 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="relative aspect-[4/3] rounded-t-lg overflow-hidden">
          <Image
                  src="/images/blog/whoisguanyin/putuo-temple.jpg"
                  alt="普陀山寺庙"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-burgundy mb-3 font-kai">观世音菩萨是谁？普陀山与菩萨的慈悲</h3>
                <p className="text-dark-brown mb-4 line-clamp-3 font-song">在佛教文化中，观世音菩萨是大慈大悲的象征，她普渡众生、化解苦难，是许多信徒心中的庇护神。她被广泛崇敬，尤其在中国，拥有众多信徒。本文将探讨...</p>
                <div className="flex justify-end">
                  <Link 
                    href="/blog/who-is-guan-yin" 
                    className="inline-flex items-center text-burgundy hover:text-deep-gold transition-colors font-kai"
                  >
                    阅读全文
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
