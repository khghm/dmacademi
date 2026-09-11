import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { ArrowLeft, BookOpen, Users, Award, TrendingUp, Clock, ChevronLeft, Target, Wrench, Unlock, LayoutList, Zap } from 'lucide-react';
import CourseIcon from '../components/CourseIcon';

export default function HomePage() {
  const totalLessons = courses.reduce((acc, course) => 
    acc + course.chapters.reduce((a, ch) => a + ch.lessons.length, 0), 0
  );

  const totalChapters = courses.reduce((acc, course) => acc + course.chapters.length, 0);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-violet-400/10 rounded-full blur-2xl"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-200 text-sm mb-8">
              <Award className="w-4 h-4" />
              <span>کاملاً رایگان - بدون نیاز به ثبت‌نام</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              مسیر حرفه‌ای شدن در
              <span className="block mt-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                دیجیتال مارکتینگ
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-indigo-200 leading-relaxed mb-10 max-w-3xl mx-auto">
              جامع‌ترین منبع آموزش دیجیتال مارکتینگ به زبان فارسی. از مبانی تا تکنیک‌های پیشرفته، 
              همه آنچه برای ورود موفق به بازار کار دیجیتال مارکتینگ ایران نیاز دارید، اینجا بیابید.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/#courses"
                className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 text-center"
              >
                مشاهده دوره‌ها
              </Link>
              <a
                href="#about"
                className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-white font-medium rounded-2xl hover:bg-white/10 transition-all duration-300 text-center"
              >
                بیشتر بدانید
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { icon: BookOpen, label: 'درس آموزشی', value: `${totalLessons}+`, color: 'from-blue-400/20 to-indigo-400/20' },
              { icon: Users, label: 'فصل تخصصی', value: `${totalChapters}`, color: 'from-purple-400/20 to-violet-400/20' },
              { icon: Award, label: 'دوره جامع', value: `${courses.length}`, color: 'from-pink-400/20 to-rose-400/20' },
              { icon: Clock, label: 'ساعت مطالعه', value: '۸۰+', color: 'from-cyan-400/20 to-teal-400/20' },
            ].map((stat, i) => (
              <div key={i} className={`relative bg-gradient-to-br ${stat.color} backdrop-blur-md rounded-3xl p-5 lg:p-7 text-center border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105`}>
                <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <stat.icon className="w-7 h-7 lg:w-9 lg:h-9 text-white/80 mx-auto mb-3 lg:mb-4" />
                  <div className="text-3xl lg:text-4xl font-black text-white mb-1.5">{stat.value}</div>
                  <div className="text-xs lg:text-sm text-indigo-200 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">چرا آکادمی دیجیتال مارکتینگ؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ما با ارائه محتوای جامع، کاربردی و به‌روز، شما را برای موفقیت در بازار کار دیجیتال مارکتینگ ایران آماده می‌کنیم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'محتوای جامع و مفصل',
                description: 'هر درس شامل توضیحات کامل، مثال‌های عملی، نکات کلیدی و موارد کاربردی است. هیچ مطلبی خلاصه و سطحی نیست و تمامی مفاهیم به صورت عمیق و ریشه‌ای تشریح شده‌اند.',
                Icon: BookOpen,
                color: 'from-blue-500 to-indigo-500'
              },
              {
                title: 'آماده‌سازی برای بازار ایران',
                description: 'تمامی مثال‌ها، ابزارها و استراتژی‌ها متناسب با بازار دیجیتال مارکتینگ ایران طراحی شده‌اند. از پلتفرم‌های ایرانی تا الگوریتم‌های محلی، همه چیز پوشش داده شده است.',
                Icon: Target,
                color: 'from-green-500 to-emerald-500'
              },
              {
                title: 'ابزارهای کمک‌آموزشی',
                description: 'نمودارهای تعاملی، جداول مقایسه‌ای، اینفوگرافیک‌ها و مثال‌های عملی واقعی برای درک عمیق‌تر مفاهیم و تبدیل دانش تئوری به مهارت عملی.',
                Icon: Wrench,
                color: 'from-purple-500 to-violet-500'
              },
              {
                title: 'بدون نیاز به ثبت‌نام',
                description: 'تمامی محتوا به صورت رایگان و بدون هیچ محدودیتی در دسترس شماست. بدون نیاز به ساخت حساب کاربری، مستقیماً هر درس را مطالعه کنید.',
                Icon: Unlock,
                color: 'from-amber-500 to-orange-500'
              },
              {
                title: 'ساختار منظم و حرفه‌ای',
                description: 'هر دوره شامل فصل‌ها و درس‌های منظم با فهرست مطالب قابل دسترس، نوار پیشرفت و ناوبری آسان بین درس‌ها برای تجربه یادگیری بهینه.',
                Icon: LayoutList,
                color: 'from-pink-500 to-rose-500'
              },
              {
                title: 'به‌روز و کاربردی',
                description: 'محتوا بر اساس آخرین تغییرات الگوریتم‌ها، ترندهای روز و ابزارهای جدید دنیا تهیه شده و به صورت دوره‌ای به‌روزرسانی می‌شود.',
                Icon: Zap,
                color: 'from-cyan-500 to-teal-500'
              }
            ].map((feature, i) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <feature.Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-7 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 lg:py-24 bg-gray-50" id="courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              <span>دوره‌های آموزشی</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">مسیر یادگیری خود را انتخاب کنید</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {courses.length} دوره جامع و تخصصی برای تسلط کامل بر دیجیتال مارکتینگ
            </p>
          </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course) => {
              const lessonCount = course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
              return (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="card-hover group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50"
                >
                  {/* Course Header */}
                  <div className={`h-44 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                    <div className="absolute inset-0">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-xl"></div>
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/15 rounded-full blur-xl"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
                    </div>
                    <div className="relative h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <CourseIcon name={course.icon} className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 lg:p-7">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-7 mb-5 line-clamp-2">
                      {course.description}
                    </p>
                    
                    {/* Course Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-5">
                      <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                        {course.chapters.length} فصل
                      </span>
                      <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                        <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
                        {lessonCount} درس
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                        کاملاً رایگان
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 group-hover:gap-2.5 transition-all">
                        شروع مطالعه
                        <ChevronLeft className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">مسیر پیشنهادی یادگیری</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              برای بهترین نتیجه، پیشنهاد می‌کنیم دوره‌ها را به ترتیب زیر مطالعه کنید
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              { step: 1, title: 'مبانی دیجیتال مارکتینگ', desc: 'آشنایی با مفاهیم پایه، شناخت کانال‌ها و اصول بنیادین بازاریابی دیجیتال', color: 'from-blue-500 to-indigo-600' },
              { step: 2, title: 'سئو حرفه‌ای', desc: 'تسلط بر بهینه‌سازی موتورهای جستجو، تحقیق کلمات کلیدی و سئو تکنیکال', color: 'from-green-500 to-emerald-600' },
              { step: 3, title: 'بازاریابی محتوایی', desc: 'تولید و توزیع محتوای ارزشمند، استراتژی محتوا و تکنیک‌های نوشتن', color: 'from-purple-500 to-violet-600' },
              { step: 4, title: 'بازاریابی شبکه‌های اجتماعی', desc: 'استراتژی و اجرای بازاریابی در اینستاگرام، لینکدین و سایر پلتفرم‌ها', color: 'from-pink-500 to-rose-600' },
              { step: 5, title: 'تبلیغات کلیکی', desc: 'مدیریت حرفه‌ای کمپین‌های تبلیغاتی در گوگل ادز و پلتفرم‌های ایرانی', color: 'from-amber-500 to-orange-600' },
              { step: 6, title: 'تحلیل داده و آنالیتیکس', desc: 'تحلیل داده‌ها، کار با گوگل آنالیتیکس و بهینه‌سازی نرخ تبدیل', color: 'from-cyan-500 to-teal-600' },
            ].map((item, i) => (
              <div key={i} className="relative flex items-start gap-5 lg:gap-7 mb-6 last:mb-0">
                {/* Connecting line */}
                {i < 5 && (
                  <div className="absolute right-[26px] lg:right-[30px] top-16 w-0.5 h-[calc(100%-2rem)] bg-gradient-to-b from-gray-200 to-gray-100"></div>
                )}
                <div className={`flex-shrink-0 w-13 h-13 lg:w-15 lg:h-15 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-black text-xl shadow-lg relative z-10`}>
                  {item.step}
                </div>
                <div className="pt-1 pb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-7">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gray-50" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">سوالات متداول</h2>
            <p className="text-gray-600">پاسخ سوالات رایج درباره دوره‌های آموزشی</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'آیا این دوره‌ها واقعاً رایگان هستند؟',
                a: 'بله، تمامی دوره‌ها و محتوای آموزشی کاملاً رایگان هستند و هیچ هزینه‌ای برای دسترسی به آنها لازم نیست. هدف ما ارائه آموزش باکیفیت به همه علاقه‌مندان است.'
              },
              {
                q: 'آیا نیاز به ثبت‌نام دارم؟',
                a: 'خیر، هیچ نیازی به ثبت‌نام یا ایجاد حساب کاربری نیست. مستقیماً می‌توانید هر درس را مطالعه کنید.'
              },
              {
                q: 'این دوره‌ها برای چه کسانی مناسب است؟',
                a: 'این دوره‌ها برای همه سطوح مناسب هستند: از مبتدیانی که تازه می‌خواهند وارد حوزه دیجیتال مارکتینگ شوند تا حرفه‌ای‌هایی که می‌خواهند دانش خود را به‌روز کنند.'
              },
              {
                q: 'آیا پس از اتمام دوره مدرک دریافت می‌کنم؟',
                a: 'در حال حاضر مدرکی ارائه نمی‌شود. اما دانش و مهارتی که کسب می‌کنید بسیار ارزشمندتر از هر مدرکی است و شما را برای ورود به بازار کار آماده می‌کند.'
              },
              {
                q: 'محتوا چقدر به‌روز است؟',
                a: 'محتوای دوره‌ها بر اساس آخرین تغییرات الگوریتم‌ها، ترندها و ابزارهای روز دنیا تهیه شده و به صورت دوره‌ای به‌روزرسانی می‌شود.'
              },
            ].map((faq, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 lg:p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold transition-colors">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-800 mb-2">{faq.q}</h3>
                    <p className="text-sm text-gray-600 leading-8">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '32px 32px'}}></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-200 text-sm mb-8 border border-white/10">
            <Award className="w-4 h-4" />
            <span>بیش از ۸۰ ساعت محتوای آموزشی رایگان</span>
          </div>
          <h2 className="text-2xl lg:text-5xl font-black text-white mb-6 leading-tight">
            آماده شروع مسیر حرفه‌ای خود هستید؟
          </h2>
          <p className="text-indigo-200 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            همین حالا اولین درس خود را شروع کنید و قدم به قدم به یک متخصص دیجیتال مارکتینگ تبدیل شوید. بدون نیاز به ثبت‌نام و کاملاً رایگان.
          </p>
          <Link
            to="/course/digital-marketing-fundamentals"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-700 font-bold rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 text-lg"
          >
            <span>شروع از مبانی دیجیتال مارکتینگ</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
