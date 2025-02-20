import Image from 'next/image';
import Link from 'next/link';

export default function PrayerThanksgivingGuide() {
  return (
    <div className="min-h-screen bg-bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 文章标题和发布时间 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-burgundy mb-4 font-kai">
            向观音菩萨祈求庇佑的请愿文、还愿文与回向偈怎么讲？
          </h1>
          <time className="text-gray-600 font-song">发布于：2025年2月16日</time>
        </div>

        {/* 引言 */}
        <div className="bg-white bg-opacity-80 rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-xl font-bold text-burgundy mb-4 font-kai">引言：向观音菩萨祈求庇佑的请愿文、还愿文与回向偈</h2>
          <div className="text-dark-brown font-song leading-relaxed space-y-4">
            <p>
              在佛教信仰中，观音菩萨被视为"大悲菩萨"，她广受信徒的尊敬与崇拜，象征着无私的慈悲与救赎。无论是生活中的困境、健康的忧虑，还是心灵的痛苦，信徒们都会向观音菩萨虔诚祈愿，寻求庇佑与保佑。而在祈愿的过程中，如何正确表达心中的请求和感恩，便成为了一项重要的仪式。
            </p>
            <p>
              向观音菩萨请愿时，通常会以"请愿文"来表述自己的愿望，诚心地诉说自己的苦难与需求；当愿望实现后，信徒们又会以"还愿文"来表达感恩之情，感谢菩萨的慈悲庇佑。同时，回向偈则是信徒们在完成祈愿与还愿后，向菩萨及所有众生回向功德，愿一切众生都能得到福祉与智慧。
            </p>
            <p>
              在本文中，我们将详细介绍如何撰写向观音菩萨的请愿文、还愿文及回向偈，帮助信徒们在祈愿的过程中更加虔诚与真诚，表达内心的感恩与希望。
            </p>
          </div>
        </div>

        {/* 正文板块1：请愿文 */}
        <div className="bg-white bg-opacity-80 rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-xl font-bold text-burgundy mb-4 font-kai">请愿文</h2>
          <div className="text-dark-brown font-song leading-relaxed space-y-4">
            <p className="text-center italic">南无大慈大悲观世音菩萨（三遍）</p>
            <p>
              弟子今日顶礼佛前，恭敬焚香，虔诚请愿。愿：（将心中所思所想所愿，诉于佛前）
            </p>
            <p>
              弟子将以感恩之心，践行善念，广结善缘。一切皆有因果，弟子将以感恩、敬畏之心，秉持善念，广行好事。
            </p>
            <p>
              愿大慈大悲观世音菩萨垂怜，应允弟子之请愿。弟子【你的名字】。诚心叩首。【具体日期】
            </p>
          </div>
        </div>

        {/* 正文板块2：还愿文 */}
        <div className="bg-white bg-opacity-80 rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-xl font-bold text-burgundy mb-4 font-kai">还愿文</h2>
          <div className="text-dark-brown font-song leading-relaxed space-y-4">
            <p className="text-center italic">南无大慈大悲观世音菩萨（三遍）</p>
            <p>
              弟子【你的名字】至诚顶礼，感恩大慈大悲观世音菩萨护佑于我，使我所求如愿【愿望实现情况简述】。弟子将以虔诚之心于佛前：或亦供佛、或亦点灯，以此相表法，传递佛法智慧与慈悲，让更多的人感受到佛菩萨的恩泽！
            </p>
            <p>
              弟子【你的名字】。诚心叩首。【具体日期】
            </p>
            <p>
              放生与慈善：许多信徒还会选择在观音诞当天放生，象征放下业障，积累福德，借此向观音菩萨表达感恩与回报。
            </p>
          </div>

          {/* 图片部分 */}
          <div className="my-8">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/blog/prayerthanks/guanyin-prayer-guide.jpg"
                alt="普陀山-南海观音像"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <p className="text-sm text-gray-600 text-center mt-2 font-song">普陀山-南海观音像</p>
          </div>
        </div>

        {/* 正文板块3：回向偈 */}
        <div className="bg-white bg-opacity-80 rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-xl font-bold text-burgundy mb-4 font-kai">回向偈</h2>
          <div className="text-dark-brown font-song leading-relaxed space-y-4">
            <p className="text-center italic">南无大慈大悲观世音菩萨（三遍）</p>
            <p>
              弟子【名字】今于观世音菩萨前虔诚供灯、供佛之功德回向十方法界一切有情众生，愿一切众生圆满诸福慧，圆成胜善根，安住大乘，明心见性，修学种智，圆证无上正等菩提。
            </p>
          </div>
        </div>

        {/* 结语 */}
        <div className="bg-white bg-opacity-80 rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-xl font-bold text-burgundy mb-4 font-kai">结语：虔诚祈愿，感恩回向</h2>
          <div className="text-dark-brown font-song leading-relaxed space-y-4">
            <p>
              向观音菩萨祈求庇佑的过程，不仅仅是为了求得外在的帮助，更是一次心灵的洗涤与升华。通过请愿文、还愿文与回向偈，信徒们将内心的愿望与感恩之情传达给菩萨，并借此与观音菩萨建立更加深厚的精神联系。观音菩萨的慈悲无量，愿她的庇佑与智慧能够帮助我们化解困境、增进福报，同时带给我们无尽的平安与宁静。
            </p>
            <p>
              在信仰的道路上，我们通过虔诚的祈愿和回向，回报菩萨的恩德，也让自己在不断积德行善的过程中，修行得以升华。无论是求得安慰、解决问题，还是通过回向帮助众生，祈愿的真正意义在于让我们的心灵得到净化与成长。愿每一位信徒都能在观音菩萨的庇佑下，行善积德，心中常怀慈悲与感恩，走向更光明的人生之路。
            </p>
          </div>
        </div>

        {/* 返回首页按钮 */}
        <div className="text-center">
          <Link href="/" className="inline-block px-8 py-3 bg-burgundy text-white rounded-full hover:bg-opacity-90 transition-colors font-kai">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
} 