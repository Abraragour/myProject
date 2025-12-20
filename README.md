**E-Commerce React App**

وصف قصير:
- **ملخص:** تطبيق متجر إلكتروني مبني بـ React و Vite لعرض المنتجات، السلة، وعمليات الدفع.

**الميزات**:
- **عرض المنتجات:** صفحات للمنتجات والتفاصيل.
- **عربة التسوق:** إضافة/حذف وتعديل الكمية.
- **حسابات المستخدم:** تسجيل دخول وتسجيل مستخدم (مع JWT).
- **طرق دفع:** دعم الدفع عند الاستلام (Cash payment) وبعض شاشات الطلبات.
- **حماية المسارات:** مكونات `ProtectedRoute`.

**التقنيات المستخدمة**:
- **Frontend:** React, Vite
- **State / Contexts:** Context API (`CartContext`, `UserContext`, `CounterContext`)
- **HTTP:** axios
- **React Query:** @tanstack/react-query
- **Form & Validation:** formik, yup
- **Styling:** CSS modules
- **أدوات أخرى:** react-router-dom, react-slick, fontawesome

**التنصيب والتشغيل**
1. انسخ المستودع إلى جهازك.
2. ثبت الحزم:

```
npm install
```

3. لتشغيل بيئة التطوير:

```
npm run dev
```

4. لبناء نسخة الإنتاج:

```
npm run build
```

5. لمعاينة البناء محليًا:

```
npm run preview
```

**هيكل المشروع (مهم)**
- **[src](src)**: ملفات المصدر الرئيسية.
- **[src/components](src/components)**: مكونات الواجهة مقسمة لمجلدات فرعية (Navbar, Home, Cart, Products,...).
- **[src/Context](src/Context)**: ملفات Context (CartContext.jsx, UserContext.jsx, CounterContext.jsx).
- **[public](public)**: ملفات ثابتة.
- **package.json**: سكريبتات المشروع وملفات التبعيات.

**سكريبتات متاحة**
- **`npm run dev`**: تشغيل الخادم في وضع التطوير.
- **`npm run build`**: بناء نسخة الإنتاج.
- **`npm run preview`**: معاينة نسخة الإنتاج محليًا.
- **`npm run lint`**: فحص ESLint للمشروع.

**متغيرات البيئة**
- إن كانت هناك متغيرات بيئة (API URLs أو مفاتيح)، أضف ملف `.env` در جذر المشروع وقم بتعريفها هناك. مثال:

```
VITE_API_URL=https://api.example.com

```

**ملاحظات حول التطوير**
- يستخدم المشروع CSS Modules في مكونات متعددة.
- توجد مجلدات جاهزة لصفحات مثل `ProductDetails`, `AllOrders`, `Register`, `Login`.

**المساهمة**
- لأي تعديلات: افتح Issue أو أرسل Pull Request مع وصف التغيير وطريقة الاختبار.

**الترخيص**
- استخدم الترخيص المناسب للمشروع (مثلاً MIT) أو احذف هذا القسم إن لم تكن تريد نشر المشروع علنياً.

---

ملف README هذا قابل للتحديث لو ترغب أن أضيف شرحًا للـ API، لقطات شاشة، أو خطوات نشر إلى GitHub Pages/Netlify.
# e_commerce