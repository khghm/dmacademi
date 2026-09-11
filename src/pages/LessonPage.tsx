import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById, getLessonById } from '../data/courses';
import { ArrowRight, ArrowLeft, BookOpen, Clock, List, ChevronLeft, Lightbulb, Target, FileText, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [isTocOpen, setIsTocOpen] = useState(false);

  const course = getCourseById(courseId || '');
  const lessonData = getLessonById(courseId || '', lessonId || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  if (!course || !lessonData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">درس مورد نظر یافت نشد</h2>
          <Link to="/" className="text-indigo-600 hover:underline">بازگشت به صفحه اصلی</Link>
        </div>
      </div>
    );
  }

  const { lesson, chapter } = lessonData;

  // Find prev/next lessons
  const allLessons = course.chapters.flatMap(ch => ch.lessons.map(l => ({ ...l, chapterId: ch.id, chapterTitle: ch.title })));
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="animate-fade-in">
      {/* Top Bar */}
      <div className={`bg-gradient-to-r ${course.color} py-3`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-white transition-colors hidden sm:inline">صفحه اصلی</Link>
              <ChevronLeft className="w-3 h-3 hidden sm:inline" />
              <Link to={`/course/${course.id}`} className="hover:text-white transition-colors">{course.title}</Link>
              <ChevronLeft className="w-3 h-3" />
              <span className="text-white truncate max-w-[150px] sm:max-w-none">{lesson.title}</span>
            </nav>
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg text-white text-xs"
            >
              <List className="w-4 h-4" />
              فهرست مطالب
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar - TOC */}
          <aside className={`
            fixed lg:sticky top-16 lg:top-24 right-0 z-40 lg:z-0
            w-72 lg:w-64 xl:w-72 flex-shrink-0
            h-[calc(100vh-4rem)] lg:h-auto lg:max-h-[calc(100vh-6rem)]
            bg-white lg:bg-transparent
            shadow-2xl lg:shadow-none
            transform transition-transform duration-300
            ${isTocOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            overflow-y-auto
            p-6 lg:p-0
          `}>
            {/* Mobile overlay */}
            {isTocOpen && (
              <div 
                className="fixed inset-0 bg-black/50 lg:hidden -z-10"
                onClick={() => setIsTocOpen(false)}
              />
            )}

            <div className="lg:bg-white lg:rounded-3xl lg:border lg:border-gray-100 lg:shadow-lg lg:shadow-gray-100/50 lg:p-6">
              <h3 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <List className="w-3.5 h-3.5 text-white" />
                </div>
                فهرست مطالب
              </h3>

              {/* Chapter Navigation */}
              <div className="space-y-2 mb-6">
                {course.chapters.map((ch, chIdx) => (
                  <div key={ch.id}>
                    <div className={`text-xs font-bold px-3 py-2.5 rounded-xl transition-colors ${ch.id === chapter.id ? 'text-indigo-700 bg-indigo-50 border border-indigo-100' : 'text-gray-500'}`}>
                      فصل {chIdx + 1}: {ch.title}
                    </div>
                    {ch.id === chapter.id && (
                      <div className="mt-1.5 space-y-1 pr-2">
                        {ch.lessons.map((l, lIdx) => (
                          <Link
                            key={l.id}
                            to={`/course/${course.id}/lesson/${l.id}`}
                            onClick={() => setIsTocOpen(false)}
                            className={`block text-xs px-3 py-2.5 rounded-xl transition-all duration-200 ${
                              l.id === lesson.id 
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-md shadow-indigo-200' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600 hover:pr-4'
                            }`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${l.id === lesson.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{lIdx + 1}</span>
                              {l.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2.5">
                  <span className="font-medium">پیشرفت دوره</span>
                  <span className="font-bold text-indigo-600">{currentIndex + 1} از {allLessons.length}</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="progress-bar h-full"
                    style={{ width: `${((currentIndex + 1) / allLessons.length) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center">
                  {Math.round(((currentIndex + 1) / allLessons.length) * 100)}% تکمیل شده
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Lesson Header */}
            <div className="mb-8 lg:mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${course.color} text-white shadow-md`}>
                  فصل {course.chapters.indexOf(chapter) + 1}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.duration}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  <BookOpen className="w-3.5 h-3.5" />
                  درس {currentIndex + 1} از {allLessons.length}
                </span>
              </div>
              
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-black text-gray-900 mb-5 leading-tight">
                {lesson.title}
              </h1>

              <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-5"></div>

              <p className="text-gray-600 leading-9 text-base lg:text-lg">
                {chapter.description}
              </p>
            </div>

            {/* Lesson Content */}
            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 p-6 lg:p-12 mb-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="relative lesson-content">
                {lesson.content.map((paragraph, idx) => (
                  <p key={idx} className="mb-8 last:mb-0 leading-9 text-gray-700 text-base lg:text-[1.08rem]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Key Points */}
            {lesson.keyPoints.length > 0 && (
              <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50 rounded-3xl border border-indigo-200/50 p-6 lg:p-10 mb-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-violet-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">نکات کلیدی این درس</h2>
                      <p className="text-xs text-indigo-600 mt-0.5">خلاصه‌ای از مهم‌ترین مفاهیم</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lesson.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 hover:bg-white/80 transition-colors">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mt-1">
                          <span className="text-white text-xs font-bold">{idx + 1}</span>
                        </div>
                        <p className="text-sm lg:text-base text-gray-700 leading-8 font-medium">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Practical Example */}
            {lesson.practicalExample && (
              <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl border border-amber-200/60 p-6 lg:p-10 mb-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-200">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">مثال عملی و کاربردی</h2>
                      <p className="text-xs text-amber-700 mt-0.5">پیاده‌سازی واقعی مفاهیم در کسب‌وکار</p>
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-amber-100/80 shadow-sm">
                    <p className="text-sm lg:text-base text-gray-700 leading-9">
                      {lesson.practicalExample}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Visual Aid - Summary Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 p-6 lg:p-10 mb-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-200">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">خلاصه تصویری درس</h2>
                  <p className="text-xs text-gray-500 mt-0.5">نکات کلیدی در یک نگاه</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.keyPoints.slice(0, 4).map((point, idx) => (
                  <div key={idx} className="group flex items-start gap-4 p-5 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-indigo-200 group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-8 font-medium pt-1">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Chart */}
            <LessonChart lessonId={lesson.id} courseId={course.id} />

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-8 mt-8 border-t border-gray-100">
              {prevLesson ? (
                <Link
                  to={`/course/${course.id}/lesson/${prevLesson.id}`}
                  className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-50 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">درس قبلی</div>
                    <div className="text-sm font-bold text-gray-800 group-hover:text-indigo-600 transition-colors truncate max-w-[200px]">
                      {prevLesson.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link
                  to={`/course/${course.id}/lesson/${nextLesson.id}`}
                  className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:shadow-xl hover:shadow-indigo-200 transition-all group sm:ml-auto"
                >
                  <div className="text-right">
                    <div className="text-xs text-white/70 mb-0.5">درس بعدی</div>
                    <div className="text-sm font-bold truncate max-w-[200px]">
                      {nextLesson.title}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ) : (
                <Link
                  to={`/course/${course.id}`}
                  className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-xl hover:shadow-green-200 transition-all group sm:ml-auto"
                >
                  <div className="text-right">
                    <div className="text-xs text-white/70 mb-0.5">پایان فصل</div>
                    <div className="text-sm font-bold">بازگشت به دوره</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </Link>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Chart data for different lessons
const chartDataMap: Record<string, { title: string; type: 'bar' | 'pie'; data: { name: string; value: number }[] }> = {
  'lesson-1-1': {
    title: 'سهم کانال‌های دیجیتال مارکتینگ از بودجه بازاریابی',
    type: 'pie',
    data: [
      { name: 'شبکه‌های اجتماعی', value: 28 },
      { name: 'سئو و محتوا', value: 24 },
      { name: 'تبلیغات کلیکی', value: 22 },
      { name: 'ایمیل مارکتینگ', value: 14 },
      { name: 'سایر', value: 12 },
    ]
  },
  'lesson-1-2': {
    title: 'مقایسه هزینه جذب مشتری: دیجیتال در برابر سنتی',
    type: 'bar',
    data: [
      { name: 'بیلبورد', value: 85 },
      { name: 'تلویزیون', value: 120 },
      { name: 'چاپ', value: 65 },
      { name: 'دیجیتال مارکتینگ', value: 15 },
    ]
  },
  'lesson-1-3': {
    title: 'نرخ بازگشت سرمایه (ROI) کانال‌های مختلف (درصد)',
    type: 'bar',
    data: [
      { name: 'ایمیل', value: 4200 },
      { name: 'سئو', value: 800 },
      { name: 'محتوا', value: 650 },
      { name: 'شبکه اجتماعی', value: 350 },
      { name: 'PPC', value: 200 },
    ]
  },
  'lesson-2-1': {
    title: 'مراحل تدوین استراتژی دیجیتال مارکتینگ',
    type: 'bar',
    data: [
      { name: 'تحلیل وضعیت', value: 15 },
      { name: 'تعریف اهداف', value: 10 },
      { name: 'شناخت مخاطب', value: 25 },
      { name: 'انتخاب کانال', value: 20 },
      { name: 'تخصیص بودجه', value: 15 },
      { name: 'اندازه‌گیری', value: 15 },
    ]
  },
  'seo-1-1': {
    title: 'درصد ترافیک وب‌سایت‌ها از منابع مختلف',
    type: 'pie',
    data: [
      { name: 'جستجوی ارگانیک', value: 53 },
      { name: 'مستقیم', value: 15 },
      { name: 'ارجاعی', value: 12 },
      { name: 'شبکه اجتماعی', value: 10 },
      { name: 'پولی', value: 6 },
      { name: 'ایمیل', value: 4 },
    ]
  },
  'seo-1-3': {
    title: 'سختی کلمات کلیدی بر اساس طول عبارت',
    type: 'bar',
    data: [
      { name: '۱ کلمه‌ای', value: 90 },
      { name: '۲ کلمه‌ای', value: 70 },
      { name: '۳ کلمه‌ای', value: 45 },
      { name: '۴+ کلمه‌ای', value: 20 },
    ]
  },
  'cm-1-1': {
    title: 'اثربخشی بازاریابی محتوایی نسبت به تبلیغات سنتی',
    type: 'bar',
    data: [
      { name: 'هزینه کمتر', value: 62 },
      { name: 'لید بیشتر', value: 300 },
      { name: 'engagement', value: 70 },
      { name: 'نرخ تبدیل', value: 150 },
    ]
  },
  'sm-1-1': {
    title: 'سهم کاربران شبکه‌های اجتماعی در ایران (میلیون نفر)',
    type: 'bar',
    data: [
      { name: 'اینستاگرام', value: 50 },
      { name: 'تلگرام', value: 45 },
      { name: 'واتساپ', value: 35 },
      { name: 'لینکدین', value: 8 },
      { name: 'توییتر', value: 5 },
    ]
  },
  'pa-1-1': {
    title: 'مقایسه مدل‌های تبلیغاتی از نظر ریسک تبلیغ‌دهنده',
    type: 'bar',
    data: [
      { name: 'CPM', value: 80 },
      { name: 'PPC', value: 50 },
      { name: 'CPL', value: 30 },
      { name: 'CPA', value: 10 },
    ]
  },
  'an-1-1': {
    title: 'منابع ترافیک یک وب‌سایت موفق (درصد)',
    type: 'pie',
    data: [
      { name: 'ارگانیک', value: 40 },
      { name: 'مستقیم', value: 20 },
      { name: 'ارجاعی', value: 15 },
      { name: 'شبکه اجتماعی', value: 15 },
      { name: 'ایمیل', value: 10 },
    ]
  },
  'an-1-2': {
    title: 'تأثیر عوامل مختلف بر نرخ تبدیل (درصد بهبود)',
    type: 'bar',
    data: [
      { name: 'سرعت سایت', value: 35 },
      { name: 'CTA واضح', value: 28 },
      { name: 'نماد اعتماد', value: 22 },
      { name: 'فرم ساده', value: 45 },
      { name: 'موبایل فرندلی', value: 30 },
    ]
  },
  'pa-1-2': {
    title: 'تأثیر عناصر مختلف بر نرخ کلیک تبلیغ (CTR درصد)',
    type: 'bar',
    data: [
      { name: 'کلمه کلیدی در عنوان', value: 65 },
      { name: 'استفاده از عدد', value: 50 },
      { name: 'CTA واضح', value: 45 },
      { name: 'Extension‌ها', value: 35 },
      { name: 'پیشنهاد ویژه', value: 55 },
    ]
  },
  'pa-2-1': {
    title: 'مقایسه نرخ تبدیل تبلیغات عادی و Remarketing (درصد)',
    type: 'bar',
    data: [
      { name: 'تبلیغ عادی', value: 2 },
      { name: 'Remarketing سایت', value: 5 },
      { name: 'Remarketing سبد خرید', value: 12 },
      { name: 'Remarketing ایمیل', value: 8 },
    ]
  },
  'sm-1-3': {
    title: 'بهترین زمان انتشار محتوا در اینستاگرام (میانگین engagement)',
    type: 'bar',
    data: [
      { name: '۸-۱۰ صبح', value: 65 },
      { name: '۱۲-۱۴ ظهر', value: 80 },
      { name: '۱۶-۱۸ عصر', value: 55 },
      { name: '۱۹-۲۱ شب', value: 90 },
      { name: '۲۱-۲۳ شب', value: 70 },
    ]
  },
  'sm-2-1': {
    title: 'منابع درآمد اینفلوئنسرهای ایرانی (درصد)',
    type: 'pie',
    data: [
      { name: 'همکاری با برندها', value: 45 },
      { name: 'فروش محصول', value: 25 },
      { name: 'دوره آموزشی', value: 15 },
      { name: 'افیلیت', value: 10 },
      { name: 'اشتراک ویژه', value: 5 },
    ]
  },
};

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

function LessonChart({ lessonId }: { lessonId: string; courseId: string }) {
  const chartInfo = chartDataMap[lessonId];
  
  if (!chartInfo) return null;

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 rounded-3xl border border-gray-200/60 shadow-lg shadow-blue-100/30 p-6 lg:p-10 mb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{chartInfo.title}</h2>
            <p className="text-xs text-gray-500 mt-0.5">نمودار تعاملی - برای مشاهده جزئیات روی هر بخش هاور کنید</p>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/80 shadow-inner">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartInfo.type === 'bar' ? (
                <BarChart data={chartInfo.data} margin={{ top: 20, right: 20, left: 0, bottom: 25 }}>
                  <defs>
                    {COLORS.map((color, idx) => (
                      <linearGradient key={idx} id={`gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={1} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'Vazirmatn', fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: '1px solid #e5e7eb',
                      fontFamily: 'Vazirmatn',
                      direction: 'rtl' as const,
                      fontSize: '13px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      padding: '12px 16px'
                    }} 
                  />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {chartInfo.data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#gradient-${index % COLORS.length})`} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <PieChart>
                  <defs>
                    {COLORS.map((color, idx) => (
                      <linearGradient key={idx} id={`pie-gradient-${idx}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={1} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.8} />
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={chartInfo.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="white"
                    strokeWidth={3}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={{ stroke: '#9ca3af', strokeWidth: 1.5 }}
                  >
                    {chartInfo.data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#pie-gradient-${index % COLORS.length})`} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: '1px solid #e5e7eb',
                      fontFamily: 'Vazirmatn',
                      direction: 'rtl' as const,
                      fontSize: '13px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      padding: '12px 16px'
                    }} 
                  />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
