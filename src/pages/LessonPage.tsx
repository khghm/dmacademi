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

            <div className="lg:bg-white lg:rounded-2xl lg:border lg:border-gray-100 lg:shadow-sm lg:p-6">
              <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <List className="w-4 h-4 text-indigo-500" />
                فهرست مطالب درس
              </h3>

              {/* Chapter Navigation */}
              <div className="space-y-1 mb-6">
                {course.chapters.map((ch, chIdx) => (
                  <div key={ch.id}>
                    <div className={`text-xs font-medium px-3 py-2 rounded-lg ${ch.id === chapter.id ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'}`}>
                      فصل {chIdx + 1}: {ch.title}
                    </div>
                    {ch.id === chapter.id && (
                      <div className="mt-1 space-y-0.5 pr-3">
                        {ch.lessons.map((l, lIdx) => (
                          <Link
                            key={l.id}
                            to={`/course/${course.id}/lesson/${l.id}`}
                            onClick={() => setIsTocOpen(false)}
                            className={`block text-xs px-3 py-2 rounded-lg transition-colors ${
                              l.id === lesson.id 
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                            }`}
                          >
                            {lIdx + 1}. {l.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>پیشرفت دوره</span>
                  <span>{currentIndex + 1} از {allLessons.length}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="progress-bar h-full"
                    style={{ width: `${((currentIndex + 1) / allLessons.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Lesson Header */}
            <div className="mb-8 lg:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${course.color} text-white`}>
                  فصل {course.chapters.indexOf(chapter) + 1}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.duration}
                </span>
              </div>
              
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {lesson.title}
              </h1>

              <p className="text-gray-600 leading-8 text-base lg:text-lg">
                {chapter.description}
              </p>
            </div>

            {/* Lesson Content */}
            <div className="lesson-content bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-10 mb-8">
              {lesson.content.map((paragraph, idx) => (
                <p key={idx} className="mb-6 last:mb-0 leading-8 text-gray-700 text-base lg:text-[1.05rem]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Points */}
            {lesson.keyPoints.length > 0 && (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 lg:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">نکات کلیدی این درس</h2>
                </div>
                <div className="space-y-3">
                  {lesson.keyPoints.map((point, idx) => (
                    <div key={idx} className="key-point text-sm lg:text-base text-gray-700 leading-8">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practical Example */}
            {lesson.practicalExample && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6 lg:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">مثال عملی و کاربردی</h2>
                </div>
                <div className="bg-white/70 rounded-xl p-5 lg:p-6 border border-amber-100">
                  <p className="text-sm lg:text-base text-gray-700 leading-8">
                    {lesson.practicalExample}
                  </p>
                </div>
              </div>
            )}

            {/* Visual Aid - Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">خلاصه تصویری درس</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.keyPoints.slice(0, 4).map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-7">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Chart */}
            <LessonChart lessonId={lesson.id} courseId={course.id} />

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-8 border-t border-gray-100">
              {prevLesson ? (
                <Link
                  to={`/course/${course.id}/lesson/${prevLesson.id}`}
                  className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all group"
                >
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  <div>
                    <div className="text-xs text-gray-500">درس قبلی</div>
                    <div className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors truncate max-w-[200px]">
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
                  className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all group sm:ml-auto"
                >
                  <div className="text-left">
                    <div className="text-xs text-white/70">درس بعدی</div>
                    <div className="text-sm font-medium truncate max-w-[200px]">
                      {nextLesson.title}
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  to={`/course/${course.id}`}
                  className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all group sm:ml-auto"
                >
                  <div className="text-left">
                    <div className="text-xs text-white/70">پایان فصل</div>
                    <div className="text-sm font-medium">بازگشت به دوره</div>
                  </div>
                  <BookOpen className="w-4 h-4" />
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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-800">{chartInfo.title}</h2>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartInfo.type === 'bar' ? (
            <BarChart data={chartInfo.data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'Vazirmatn' }} angle={-15} textAnchor="end" />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb',
                  fontFamily: 'Vazirmatn',
                  direction: 'rtl' as const,
                  fontSize: '13px'
                }} 
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartInfo.data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={chartInfo.data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={{ stroke: '#9ca3af' }}
              >
                {chartInfo.data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb',
                  fontFamily: 'Vazirmatn',
                  direction: 'rtl' as const,
                  fontSize: '13px'
                }} 
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
