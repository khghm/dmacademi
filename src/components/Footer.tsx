import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-white">آکادمی دیجیتال مارکتینگ</span>
            </Link>
            <p className="text-sm leading-7 text-gray-400">
              مرجع آموزش رایگان و حرفه‌ای دیجیتال مارکتینگ برای فارسی‌زبانان. ما متعهد هستیم بهترین و کامل‌ترین محتوای آموزشی را در اختیار شما قرار دهیم.
            </p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-bold mb-4">دوره‌های آموزشی</h3>
            <ul className="space-y-3">
              <li><Link to="/course/digital-marketing-fundamentals" className="text-sm hover:text-indigo-400 transition-colors">مبانی دیجیتال مارکتینگ</Link></li>
              <li><Link to="/course/seo" className="text-sm hover:text-indigo-400 transition-colors">سئو حرفه‌ای</Link></li>
              <li><Link to="/course/content-marketing" className="text-sm hover:text-indigo-400 transition-colors">بازاریابی محتوایی</Link></li>
              <li><Link to="/course/social-media" className="text-sm hover:text-indigo-400 transition-colors">شبکه‌های اجتماعی</Link></li>
              <li><Link to="/course/paid-advertising" className="text-sm hover:text-indigo-400 transition-colors">تبلیغات کلیکی</Link></li>
              <li><Link to="/course/analytics" className="text-sm hover:text-indigo-400 transition-colors">تحلیل داده و آنالیتیکس</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-3">
              <li><a href="/#courses" className="text-sm hover:text-indigo-400 transition-colors">همه دوره‌ها</a></li>
              <li><a href="/#about" className="text-sm hover:text-indigo-400 transition-colors">درباره ما</a></li>
              <li><a href="/#faq" className="text-sm hover:text-indigo-400 transition-colors">سوالات متداول</a></li>
              <li><a href="/#contact" className="text-sm hover:text-indigo-400 transition-colors">تماس با ما</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">ارتباط با ما</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-sm">info@dm-academy.ir</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span className="text-sm" dir="ltr">021-1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="text-sm">تهران، ایران</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              تمامی حقوق مادی و معنوی این وب‌سایت محفوظ است. ۱۴۰۳
            </p>
            <p className="text-sm text-gray-500">
              طراحی و توسعه با هدف آموزش رایگان دیجیتال مارکتینگ
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
