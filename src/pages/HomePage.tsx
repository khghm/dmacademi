import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { ArrowLeft, BookOpen, Users, Award, TrendingUp, Clock, ChevronLeft } from 'lucide-react';

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
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300 rounded-full blur-3xl"></div>
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
          <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: BookOpen, label: 'درس آموزشی', value: `${totalLessons}+` },
              { icon: Users, label: 'فصل تخصصی', value: `${totalChapters}` },
              { icon: Award, label: 'دوره جامع', value: `${courses.length}` },
              { icon: Clock, label: 'ساعت مطالعه', value: '۸۰+' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center border border-white/10">
                <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-indigo-300 mx-auto mb-2 lg:mb-3" />
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs lg:text-sm text-indigo-200">{stat.label}</div>
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
                description: 'هر درس شامل توضیحات کامل، مثال‌های عملی، نکات کلیدی و موارد کاربردی است. هیچ مطلبی خلاصه و سطحی نیست.',
                icon: '📚',
                color: 'from-blue-500 to-indigo-500'
              },
              {
                title: 'آماده‌سازی برای بازار ایران',
                description: 'تمامی مثال‌ها، ابزارها و استراتژی‌ها متناسب با بازار دیجیتال مارکتینگ ایران طراحی شده‌اند.',
                icon: '🎯',
                color: 'from-green-500 to-emerald-500'
              },
              {
                title: 'ابزارهای کمک‌آموزشی',
                description: 'نمودارها، جداول مقایسه‌ای، مثال‌های عملی و تمرین‌های کاربردی برای درک عمیق‌تر مفاهیم.',
                icon: '🛠️',
                color: 'from-purple-500 to-violet-500'
              },
              {
                title: 'بدون نیاز به ثبت‌نام',
                description: 'تمامی محتوا به صورت رایگان و بدون هیچ محدودیتی در دسترس شماست. فقط مطالعه کنید و یاد بگیرید.',
                icon: '🔓',
                color: 'from-amber-500 to-orange-500'
              },
              {
                title: 'ساختار منظم و حرفه‌ای',
                description: 'هر دوره شامل فصل‌ها و درس‌های منظم با فهرست مطالب قابل دسترس برای مطالعه آسان‌تر.',
                icon: '📋',
                color: 'from-pink-500 to-rose-500'
              },
              {
                title: 'به‌روز و کاربردی',
                description: 'محتوا بر اساس آخرین تغییرات الگوریتم‌ها، ترندها و ابزارهای روز دنیا تهیه شده است.',
                icon: '⚡',
                color: 'from-cyan-500 to-teal-500'
              }
            ].map((feature, i) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-5 shadow-lg`}>
                  {feature.icon}
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
                  className="card-hover group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                >
                  {/* Course Header */}
                  <div className={`h-40 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full"></div>
                    </div>
                    <div className="relative h-full flex items-center justify-center">
                      <span className="text-5xl">{course.icon}</span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-7 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    {/* Course Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {course.chapters.length} فصل
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {lessonCount} درس
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        رایگان
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                        شروع مطالعه
                        <ChevronLeft className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
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
              { step: 1, title: 'مبانی دیجیتال مارکتینگ', desc: 'آشنایی با مفاهیم پایه و اصول بنیادین' },
              { step: 2, title: 'سئو حرفه‌ای', desc: 'تسلط بر بهینه‌سازی موتورهای جستجو' },
              { step: 3, title: 'بازاریابی محتوایی', desc: 'تولید و توزیع محتوای ارزشمند' },
              { step: 4, title: 'بازاریابی شبکه‌های اجتماعی', desc: 'استراتژی و اجرای بازاریابی اجتماعی' },
              { step: 5, title: 'تبلیغات کلیکی', desc: 'مدیریت حرفه‌ای کمپین‌های تبلیغاتی' },
              { step: 6, title: 'تحلیل داده و آنالیتیکس', desc: 'تحلیل داده‌ها و اندازه‌گیری عملکرد' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 lg:gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                {i < 5 && (
                  <div className="hidden lg:block absolute right-7 mt-16 w-0.5 h-8 bg-indigo-100"></div>
                )}
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
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-base font-bold text-gray-800 mb-3">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
            آماده شروع مسیر حرفه‌ای خود هستید؟
          </h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            همین حالا اولین درس خود را شروع کنید و قدم به قدم به یک متخصص دیجیتال مارکتینگ تبدیل شوید
          </p>
          <Link
            to="/course/digital-marketing-fundamentals"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
          >
            <span>شروع از مبانی دیجیتال مارکتینگ</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
