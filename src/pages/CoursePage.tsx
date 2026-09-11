import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { ArrowRight, BookOpen, Clock, ChevronLeft, CheckCircle2 } from 'lucide-react';
import CourseIcon from '../components/CourseIcon';

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = getCourseById(courseId || '');

  if (!course) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">دوره مورد نظر یافت نشد</h2>
          <Link to="/" className="text-indigo-600 hover:underline">بازگشت به صفحه اصلی</Link>
        </div>
      </div>
    );
  }

  const totalLessons = course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const firstLesson = course.chapters[0]?.lessons[0];

  return (
    <div className="animate-fade-in">
      {/* Course Hero */}
      <section className={`relative bg-gradient-to-br ${course.color} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link to="/" className="hover:text-white transition-colors">صفحه اصلی</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-white">{course.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <CourseIcon name={course.icon} className="w-9 h-9 text-white" />
                </div>
                <div>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/10">
                    دوره آموزشی
                  </span>
                  <p className="text-white/60 text-xs mt-1.5">آموزش جامع و کاربردی</p>
                </div>
              </div>
              
              <h1 className="text-2xl lg:text-5xl font-black text-white mb-5 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-white/80 leading-9 mb-10 max-w-2xl text-base lg:text-lg">
                {course.longDescription}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
                  <BookOpen className="w-5 h-5 text-white/80" />
                  <span className="text-sm text-white font-medium">{course.chapters.length} فصل</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-white/80" />
                  <span className="text-sm text-white font-medium">{totalLessons} درس</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10">
                  <Clock className="w-5 h-5 text-white/80" />
                  <span className="text-sm text-white font-medium">حدود ۸ ساعت مطالعه</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {firstLesson && (
                  <Link
                    to={`/course/${course.id}/lesson/${firstLesson.id}`}
                    className="px-8 py-4 bg-white text-gray-800 font-bold rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center gap-3 hover:scale-105"
                  >
                    <span>شروع دوره</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </Link>
                )}
                <button
                  onClick={() => {
                    const el = document.getElementById('course-content');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 border-2 border-white/30 text-white font-medium rounded-2xl hover:bg-white/10 transition-all"
                >
                    مشاهده سرفصل‌ها
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12 lg:py-20" id="course-content">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Chapter List */}
          <div className="space-y-6">
            {course.chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                {/* Chapter Header */}
                <div className="p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-l from-gray-50/50 to-transparent">
                  <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                      {chapterIndex + 1}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                        فصل {chapterIndex + 1}: {chapter.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-8">
                        {chapter.description}
                      </p>
                      <div className="flex items-center gap-3 mt-4">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-2.5 py-1.5 rounded-lg">
                          <BookOpen className="w-3.5 h-3.5" />
                          {chapter.lessons.length} درس
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lessons List */}
                <div className="divide-y divide-gray-50">
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <Link
                      key={lesson.id}
                      to={`/course/${course.id}/lesson/${lesson.id}`}
                      className="flex items-center gap-4 p-4 lg:p-6 hover:bg-gradient-to-l hover:from-indigo-50/50 hover:to-transparent transition-all group"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center text-gray-500 group-hover:text-indigo-600 text-xs font-bold transition-all group-hover:scale-110">
                        {lessonIndex + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm lg:text-base font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                        <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 group-hover:-translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:text-indigo-600 transition-colors bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به دوره‌ها</span>
            </button>
            {firstLesson && (
              <Link
                to={`/course/${course.id}/lesson/${firstLesson.id}`}
                className="flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold rounded-2xl hover:shadow-xl hover:shadow-indigo-200 transition-all hover:scale-105"
              >
                <span>شروع مطالعه</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
