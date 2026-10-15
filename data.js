/**
 * মেধাকোষ (MedhaKosh) - ব্লগ ও ফাইল ডাটাবেস
 * 
 * আপনি খুব সহজেই এখানে নতুন ব্লগ পোস্ট বা ডাউনলোড ফাইল যুক্ত করতে পারেন।
 * নিচে দেওয়া নিয়ম অনুযায়ী একটি নতুন অবজেক্ট কপি করে পেস্ট করলেই আপনার ওয়েবসাইটে তা যুক্ত হয়ে যাবে!
 */

// সাইট সিকিউরিটি কনফিগারেশন (সেন্ট্রাল পাসওয়ার্ড হ্যাশ - মোবাইল ও কম্পিউটার সব ডিভাইসে কার্যকর)
const SITE_CONFIG = {
  adminPasswordHash: "53f6ae545ce844acdefa0f4f035c108a7f50db9069bfb8bc6904dbe7704d909d"
};

const BLOG_DATA = [
  {
    id: 1,
    title: "এইচএসসি ও বিসিএস প্রস্তুতি: বাংলা ব্যাকরণ ও সাহিত্য স্পেশাল হ্যান্ডনোট",
    category: "শিক্ষা ও প্রস্তুতি",
    date: "১৪ অক্টোবর ২০২৬",
    readTime: "৫ মিনিট পাঠ",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    summary: "বাংলা ব্যাকরণের জটিল নিয়ম যেমন সন্ধি, সমাস, কারক ও বিভক্তি সহজে মনে রাখার কার্যকর শর্টকাট টেকনিক ও পূর্ণাঙ্গ PDF হ্যান্ডনোট।",
    content: `
      <p class="mb-4 leading-relaxed">বাংলা ভাষা ও সাহিত্য যেকোনো প্রতিযোগিতামূলক পরীক্ষার জন্য একটি অত্যন্ত গুরুত্বপূর্ণ বিষয়। বিশেষ করে ব্যাকরণ অংশটি নিয়ে অনেক শিক্ষার্থী ও পরীক্ষার্থী দ্বিধাদ্বন্দ্বে ভোগেন। সঠিক টেকনিক জানা থাকলে ব্যাকরণের প্রতিটি টপিকে ফুল মার্কস তোলা সম্ভব।</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">এই নোটে যা যা পাচ্ছেন:</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 leading-relaxed">
        <li>সমাস সহজে চেনার কার্যকর শর্টকাট পদ্ধতি।</li>
        <li>কারক ও বিভক্তির সহজ চার্ট ও উদাহরণ।</li>
        <li>ধ্বনির পরিবর্তন ও নত্ব-ষত্ব বিধানের নিয়ম।</li>
        <li>বাংলা সাহিত্যের প্রাচীন ও মধ্যযুগের গুরুত্বপূর্ণ প্রশ্ন ও উত্তর।</li>
      </ul>

      <p class="mb-4 leading-relaxed">আপনার পড়াশোনার সুবিধার্থে পুরো লেকচার নোটটি সাজিয়ে একটি সমন্বিত কালারফুল PDF ফাইলে রূপান্তর করা হয়েছে, যা প্রিন্ট করেও পড়তে পারবেন।</p>
    `,
    downloadFile: {
      name: "বাংলা_ব্যাকরণ_ও_সাহিত্য_হ্যান্ডনোট.pdf",
      type: "pdf",
      size: "6.4 MB",
      downloads: 3820,
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // এখানে আপনার Google Drive বা সরাসরি ফাইল লিংক দিন
    }
  },
  {
    id: 2,
    title: "শূন্য থেকে ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট: কমপ্লিট রোডম্যাপ ও গাইডবুক",
    category: "কম্পিউটার ও আইটি",
    date: "১২ অক্টোবর ২০২৬",
    readTime: "৮ মিনিট পাঠ",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    summary: "HTML, CSS, JavaScript থেকে শুরু করে React এবং Node.js শেখার কমপ্লিট স্টেপ-বাই-স্টেপ রোডম্যাপ, ফ্রি রিসোর্স ও চিটশিট বান্ডেল।",
    content: `
      <p class="mb-4 leading-relaxed">বর্তমানে প্রযুক্তির যুগে ওয়েব ডেভেলপমেন্ট একটি জনপ্রিয় এবং লাভজনক ক্যারিয়ার। কিন্তু একজন শিক্ষানবিস ডেভেলপার হিসেবে কোথা থেকে শুরু করবেন এবং কোন বিষয়গুলো সিরিয়ালি শিখবেন তা ঠিক করা অনেক সময় বিভ্রান্তিকর হয়ে দাঁড়ায়।</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">রোডম্যাপের মূল ধাপসমূহ:</h3>
      <ol class="list-decimal list-inside space-y-2 mb-4 leading-relaxed">
        <li><strong>বেসিক ফাউন্ডেশন:</strong> HTML5 সিনট্যাক্স, সিমান্টিক ট্যাগ ও CSS3 ফ্লেক্সবক্স ও গ্রিড লেআউট।</li>
        <li><strong>প্রোগ্রামিং লজিক:</strong> আধুনিক JavaScript (ES6+), DOM ম্যানিপুলেশন ও Fetch API।</li>
        <li><strong>ফ্রন্টএন্ড ফ্রেমওয়ার্ক:</strong> React.js, Tailwind CSS ও কম্পোনেন্ট লাইব্রেরি।</li>
        <li><strong>ব্যাকএন্ড ও ডেটাবেস:</strong> Node.js, Express এবং MongoDB / PostgreSQL।</li>
      </ol>

      <p class="mb-4 leading-relaxed">এই আর্টিকেলের সাথে আমরা সম্পূর্ণ রোডম্যাপের রঙিন ইনফোগ্রাফিক চার্ট এবং প্রয়োজনীয় সব কোড সিনট্যাক্স চিটশিট ZIP আকারে যুক্ত করেছি।</p>
    `,
    downloadFile: {
      name: "Web_Development_Roadmap_Cheatsheet.zip",
      type: "zip",
      size: "14.2 MB",
      downloads: 5120,
      url: "#"
    }
  },
  {
    id: 3,
    title: "প্রফেশনাল রেজুমে ও সিভি টেমপ্লেট বান্ডেল (Word & PDF)",
    category: "ক্যারিয়ার ও ফ্রিল্যান্সিং",
    date: "১০ অক্টোবর ২০২৬",
    readTime: "৪ মিনিট পাঠ",
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    summary: "চাকরি ও ইন্টার্নশিপে নিয়োগকারীদের দৃষ্টি আকর্ষণ করার মতো ৫টি প্রিমিয়াম আধুনিক সিভি ও কভার লেটার টেমপ্লেট।",
    content: `
      <p class="mb-4 leading-relaxed">একটি চমৎকার সিভি বা রেজুমে আপনার চাকরির আবেদনে ইন্টারভিউ কল পাওয়ার সম্ভাবনা বহুগুণ বাড়িয়ে দেয়। বেশিরভাগ নিয়োগকারী মাত্র ৬ থেকে ১০ সেকেন্ডের মধ্যে একটি সিভি দেখে সিদ্ধান্ত নেন প্রার্থীকে বাছাই করা হবে কিনা।</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">এই টেমপ্লেটের বিশেষত্ব:</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 leading-relaxed">
        <li>ATS (Applicant Tracking System) ফ্রেন্ডলি ফরম্যাট।</li>
        <li>মাইক্রোসফট ওয়ার্ড (.docx) ফাইলে সহজেই নিজের তথ্য লিখে এডিট করার সুবিধা।</li>
        <li>পরিচ্ছন্ন ও প্রফেশনাল টাইপোগ্রাফি ও লেআউট।</li>
        <li>ফ্রেশার এবং অভিজ্ঞ উভয়ের জন্যই আলাদা আলাদা ডিজাইন অন্তর্ভুক্ত।</li>
      </ul>
    `,
    downloadFile: {
      name: "Professional_Resume_Templates_Bundle.docx",
      type: "doc",
      size: "3.2 MB",
      downloads: 4230,
      url: "#"
    }
  },
  {
    id: 4,
    title: "মাইক্রোসফট এক্সেল মাস্টারক্লাস: প্রয়োজনীয় ২০টি ফর্মুলা ও শর্টকাট",
    category: "কম্পিউটার ও আইটি",
    date: "০৫ অক্টোবর ২০২৬",
    readTime: "৬ মিনিট পাঠ",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    summary: "অফিস ও ডাটা এন্ট্রির দৈনন্দিন কাজে সময় বাঁচানোর জন্য ভি-লুকআপ (VLOOKUP), এক্স-লুকআপ (XLOOKUP) ও পিভট টেবিলের প্র্যাকটিস এক্সেল শিট।",
    content: `
      <p class="mb-4 leading-relaxed">কর্মক্ষেত্রে মাইক্রোসফট এক্সেলের দক্ষতা থাকা এখন প্রায় বাধ্যতামূলক। সঠিকভাবে ফর্মুলা ব্যবহার করতে জানলে ঘণ্টার কাজ কয়েক মিনিটে নামিয়ে আনা সম্ভব।</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">শীর্ষ ফর্মুলাগুলো:</h3>
      <p class="mb-4 leading-relaxed">আমরা এই ব্লগে VLOOKUP, INDEX-MATCH, SUMIFS, COUNTIFS এবং আধুনিক XLOOKUP নিয়ে বিস্তারিত আলোচনা করেছি। সাথে প্রতিটি ফর্মুলার লাইভ প্র্যাকটিস ফাইলটি দেওয়া হলো।</p>
    `,
    downloadFile: {
      name: "Excel_Top_20_Formulas_Practice_Sheet.xlsx",
      type: "excel",
      size: "2.1 MB",
      downloads: 2750,
      url: "#"
    }
  },
  {
    id: 5,
    title: "ইংরেজিতে অনর্গল কথা বলার ৫০টি কমন ডায়ালগ ও ভোকাবুলারি গাইড",
    category: "শিক্ষা ও প্রস্তুতি",
    date: "০১ অক্টোবর ২০২৬",
    readTime: "৫ মিনিট পাঠ",
    coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    summary: "দৈনন্দিন জীবনে স্পোকেন ইংলিশে ব্যবহৃত অত্যন্ত কার্যকরী বাক্য, ফ্রেজ এবং সঠিকভাবে উচ্চারণ করার অডিও-রেফারেন্স সহ পূর্ণাঙ্গ ইবুক।",
    content: `
      <p class="mb-4 leading-relaxed">ইংরেজি শেখার ক্ষেত্রে সবচেয়ে বড় বাধা হলো দ্বিধা ও সঠিক বাক্যের গঠন না জানা। প্রতিদিন মাত্র ১৫-২০ মিনিট কিছু কমন স্ট্রাকচার অনুশীলন করলেই দ্রুত জড়তা কাটিয়ে ওঠা যায়।</p>
      
      <p class="mb-4 leading-relaxed">এই গাইডে সাধারণ অভিবাদন, কেনাকাটা, ভ্রমণ ও অফিসের কথোপকথনের ৫০টি বাস্তব ডায়ালগ সংকলন করা হয়েছে।</p>
    `,
    downloadFile: {
      name: "Spoken_English_50_Dialogues_Ebook.pdf",
      type: "pdf",
      size: "5.1 MB",
      downloads: 6410,
      url: "#"
    }
  },
  {
    id: 6,
    title: "পিসির গতি বাড়ানোর সেরা অপ্টিমাইজেশন স্ক্রিপ্ট ও ফ্রি টুলস",
    category: "সফটওয়্যার ও টুলস",
    date: "২৮ সেপ্টেম্বর ২০২৬",
    readTime: "৪ মিনিট পাঠ",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    summary: "উইন্ডোজের অপ্রয়োজনীয় ক্যাশ ও টেম্প ফাইল স্বয়ংক্রিয়ভাবে ক্লিন করে ল্যাপটপ বা কম্পিউটারের পারফরম্যান্স দ্বিগুণ করার নিরাপদ স্ক্রিপ্ট।",
    content: `
      <p class="mb-4 leading-relaxed">দীর্ঘদিন ব্যবহারের ফলে উইন্ডোজ অপারেটিং সিস্টেমে বিভিন্ন ক্যাশ ফাইল ও ব্যাকগ্রাউন্ড সার্ভিস জমা হয়ে কম্পিউটার স্লো করে দেয়। কোনো ভারী পেইড সফটওয়্যার ছাড়া কীভাবে মাত্র এক ক্লিকে পিসি ফ্রেশ রাখবেন তা এই আর্টিকেলে দেখানো হয়েছে।</p>
    `,
    downloadFile: {
      name: "Windows_Super_Clean_Tool.zip",
      type: "zip",
      size: "1.8 MB",
      downloads: 3190,
      url: "#"
    }
  },
  {
    id: 7,
    title: "ক্ষুদ্র ঋণ (Microcredit) কি এবং কীভাবে আবেদন করবেন? নতুন উদ্যোক্তাদের পূর্ণাঙ্গ নির্দেশিকা",
    category: "ব্যবসা ও ক্ষুদ্র ঋণ",
    date: "১৫ অক্টোবর ২০২৬",
    readTime: "৬ মিনিট পাঠ",
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    summary: "ক্ষুদ্র ঋণ পাওয়ার প্রয়োজনীয় যোগ্যতা, আবেদনের নিয়ম, প্রয়োজনীয় কাগজপত্র, সুদের হারের হিসাব এবং সঠিক প্রতিষ্ঠান নির্বাচন করার সহজ উপায়।",
    content: `
      <p class="mb-4 leading-relaxed">ক্ষুদ্র ঋণ (Microcredit) হলো এমন একটি বিশেষ আর্থিক ব্যবস্থা, যেখানে প্রচলিত বাণিজ্যিক ব্যাংকের মতো বড় কোনো জামানত বা স্থাবর সম্পত্তি বন্ধক না রেখেই স্বল্প আয়ের মানুষ, প্রান্তিক খামারি এবং নতুন ক্ষুদ্র উদ্যোক্তাদের সহজ শর্তে ঋণ প্রদান করা হয়।</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">১. ক্ষুদ্র ঋণ কারা পেতে পারেন?</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 leading-relaxed">
        <li>যাদের কোনো নতুন বা চলমান ক্ষুদ্র ব্যবসা, দোকান, কুটির শিল্প বা হস্তশিল্প রয়েছে।</li>
        <li>কৃষি, মৎস্য চাষ, হাঁস-মুরগি পালন বা ডেইরি ফার্মের সাথে জড়িত ব্যক্তি।</li>
        <li>নারী উদ্যোক্তা এবং আত্মকর্মসংস্থান গড়তে আগ্রহী তরুণরা।</li>
        <li>যাদের কোনো প্রাতিষ্ঠানিক ব্যাংক গ্যারান্টি বা বন্ধকি জমি নেই।</li>
      </ul>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">২. আবেদনের জন্য প্রয়োজনীয় কাগজপত্র:</h3>
      <ol class="list-decimal list-inside space-y-2 mb-4 leading-relaxed">
        <li>আবেদনকারী ও জামিনদারের জাতীয় পরিচয়পত্র (NID) বা জন্মনিবন্ধনের ফটোকপি।</li>
        <li>সদ্য তোলা পাসপোর্ট সাইজ ছবি (২-৩ কপি)।</li>
        <li>পৌরসভা বা ইউনিয়ন পরিষদ থেকে প্রদত্ত নাগরিকত্ব সনদ / ট্রেড লাইসেন্স (প্রযোজ্য ক্ষেত্রে)।</li>
        <li>ব্যবসার স্থান বা দোকানের ভাড়ার চুক্তিপত্র বা প্রমাণপত্র।</li>
        <li>স্থানীয় একজন বা দুইজন বিশ্বস্ত জামিনদার (Guarantor)।</li>
      </ol>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">৩. ঋণ নেওয়ার পূর্বে যা জানা জরুরি:</h3>
      <p class="mb-4 leading-relaxed">ঋণ নেওয়ার আগে অবশ্যই প্রতিষ্ঠানের অনুমোদন (MRA নিবন্ধিত কিনা), কার্যকর সুদের হার (Declining বা Flat rate), সার্ভিস চার্জ এবং কিস্তির ধরন (সাপ্তাহিক নাকি মাসিক) স্পষ্টভাবে বুঝে চুক্তিপত্রে স্বাক্ষর করবেন।</p>
    `,
    downloadFile: {
      name: "ক্ষুদ্র_ঋণ_আবেদন_ও_ডকুমেন্ট_চেকলিস্ট.pdf",
      type: "pdf",
      size: "3.5 MB",
      downloads: 1420,
      url: "#"
    }
  },
  {
    id: 8,
    title: "ক্ষুদ্র ঋণ নিয়ে সফল ব্যবসা গড়ার ৫টি মূলনীতি: ঋণের ফাঁদ এড়ানোর বাস্তব কৌশল",
    category: "ব্যবসা ও ক্ষুদ্র ঋণ",
    date: "১৪ অক্টোবর ২০২৬",
    readTime: "৭ মিনিট পাঠ",
    coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
    summary: "ঋণের টাকা সঠিক খাতে বিনিয়োগের নিয়ম, সাপ্তাহিক বা মাসিক কিস্তির মানসিক চাপ কমানো এবং অতিরিক্ত ঋণের ফাঁদ থেকে নিরাপদ থাকার উপায়।",
    content: `
      <p class="mb-4 leading-relaxed">ক্ষুদ্র ঋণ যেমন একজন উদ্যোক্তার ভাগ্যের চাকা ঘুরিয়ে দিতে পারে, তেমনি সঠিক পরিকল্পনা না থাকলে এটি একটি বড় বোঝা বা ‘ঋণের ফাঁদ’ (Debt Trap)-এ পরিণত হতে পারে। ঋণ নিয়ে লাভজনকভাবে ব্যবসা পরিচালনার ৫টি পরীক্ষিত নিয়ম নিচে আলোচনা করা হলো:</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">১. ঋণের ১০০% অর্থ শুধু ব্যবসায় খাটানো</h3>
      <p class="mb-4 leading-relaxed">অনেকেই ঋণের টাকা পাওয়ার পর সেখান থেকে সংসারের নিত্যপ্রয়োজনীয় খরচ বা অনুৎপাদনশীল খাতে অর্থ খরচ করেন। এটি ঋণে জড়ানোর প্রধান কারণ। ঋণের প্রতিটি টাকা কেবল মালামাল কেনা বা ব্যবসায়িক মূলধন হিসেবেই ব্যবহার করুন।</p>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">২. কিস্তি আসার আগেই আয়ের বিকল্প উৎস রাখা</h3>
      <p class="mb-4 leading-relaxed">নতুন ব্যবসায় প্রথম মাসেই কাঙ্ক্ষিত মুনাফা নাও আসতে পারে। তাই প্রথম ২-৩টি কিস্তি কীভাবে পরিশোধ করবেন, তার একটি প্রাথমিক ব্যাকআপ পরিকল্পনা আগেই রাখা বুদ্ধিমানের কাজ।</p>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">৩. একাধিক এনজিও থেকে ঋণ নেওয়ার ফাঁদ পরিহার করা</h3>
      <p class="mb-4 leading-relaxed">এক প্রতিষ্ঠানের কিস্তি শোধ করতে অন্য প্রতিষ্ঠান থেকে ঋণ নেওয়ার অভ্যাস সবচেয়ে বিপজ্জনক। এতে ঋণের চক্রে স্থায়ীভাবে আটকে পড়ার ঝুঁকি তৈরি হয়। একটি ঋণ সম্পূর্ণরূপে পরিশোধের পরেই কেবল পরবর্তী ধাপে বড় ঋণের জন্য যাওয়া উচিত।</p>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">৪. দৈনিক আয় ও ব্যয়ের সুনির্দিষ্ট খাতা রাখা</h3>
      <p class="mb-4 leading-relaxed">ব্যবসায় নগদ টাকার প্রবাহ (Cash Flow) ঠিক রাখতে প্রতিদিনের বিক্রি, কেনা এবং মোট মুনাফার নিখুঁত হিসাব রাখুন। আপনার সুবিধার্থে আমরা একটি প্রস্তুত এক্সেল হিসাব শিট নিচে দিয়েছি।</p>
    `,
    downloadFile: {
      name: "ক্ষুদ্র_ব্যবসা_ও_কিস্তি_হিসাব_ক্যালকুলেটর.xlsx",
      type: "excel",
      size: "2.4 MB",
      downloads: 2150,
      url: "#"
    }
  },
  {
    id: 9,
    title: "এনজিও (NGO) হিসাব রক্ষক কর্মকর্তার দায়িত্ব ও কাজের পূর্ণাঙ্গ গাইডলাইন",
    category: "ক্যারিয়ার ও ফ্রিল্যান্সিং",
    date: "১৫ অক্টোবর ২০২৬",
    readTime: "৭ মিনিট পাঠ",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    summary: "এনজিওতে হিসাব কর্মকর্তা (Accounts Officer) হিসেবে কী কী কাজ করতে হয়? ভাউচার প্রস্তুতি, ডোনার ফান্ড ট্র্যাকিং, ব্যাংক রিকনসিলিয়েশন ও অডিট প্রস্তুতির বাস্তব নির্দেশিকা।",
    content: `
      <p class="mb-4 leading-relaxed">সাধারণ বাণিজ্যিক প্রতিষ্ঠানের চেয়ে বেসরকারি উন্নয়ন সংস্থা বা এনজিওর (NGO) হিসাবরক্ষণ ব্যবস্থা অনেকটাই ভিন্ন এবং নিয়মতান্ত্রিক। এখানে প্রতিটি টাকার খরচ নির্দিষ্ট ডোনার প্রজেক্টের বাজেট লাইন, সরকারি নীতিমালা এবং অডিট কমপ্লায়েন্স অনুযায়ী নিখুঁতভাবে পরিচালনা করতে হয়। একজন এনজিও হিসাব রক্ষক (Accounts Officer) মূলত প্রতিষ্ঠানের আর্থিক স্বচ্ছতার মেরুদণ্ড হিসেবে দায়িত্ব পালন করেন।</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">১. দৈনন্দিন লেনদেন ও ভাউচার প্রস্তুতকরণ (Vouchers & Transactions)</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 leading-relaxed">
        <li>প্রতিটি খরচের জন্য যথাযথ ডেবিট, ক্রেডিট এবং জার্নাল ভাউচার (Debit, Credit & Journal Voucher) প্রস্তুত করা।</li>
        <li>বিলের সাথে মানি রিসিট, কোটেশন, ক্রয়াদেশ (PO) এবং উপযুক্ত কর্মকর্তার অনুমোদনপত্র (Approval) যাচাই করা।</li>
        <li>দৈনন্দিন ছোটখাটো খরচের জন্য পেটি ক্যাশ (Petty Cash) নিয়ন্ত্রণ ও হিসাব রাখা।</li>
      </ul>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">২. ব্যাংক রিকনসিলিয়েশন (Bank Reconciliation)</h3>
      <p class="mb-4 leading-relaxed">প্রতি মাসের শেষে ব্যাংকের পাসবুক বা ব্যাংক স্টেটমেন্টের সাথে এনজিওর ক্যাশ বইয়ের (Cash Book) হিসাব মিলিয়ে ব্যাংক রিকনসিলিয়েশন স্টেটমেন্ট (BRS) তৈরি করা। কোনো চেক ক্লিয়ারিং বাকি থাকলে বা চার্জ কাটা হলে তা চিহ্নিত করা।</p>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">৩. প্রকল্প বাজেট ও ডোনার কমপ্লায়েন্স (Project Budget Tracking)</h3>
      <p class="mb-4 leading-relaxed">এনজিওর বিভিন্ন প্রজেক্টে দেশি ও বিদেশি উন্নয়ন সহযোগী বা ডোনারদের (যেমন: PKSF, USAID, UNICEF ইত্যাদি) দেওয়া অর্থ ছাড় হয়। হিসাব কর্মকর্তার প্রধান দায়িত্ব হলো—খরচ যেন অনুমোদিত বাজেট লাইনের বাইরে না যায় (Over-budgeting বা Misallocation রোধ করা)।</p>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">৪. পেরোল ব্যবস্থাপনা ও ভ্যাট-ট্যাক্স কর্তন (Payroll, Tax & VAT)</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 leading-relaxed">
        <li>কর্মকর্তা-কর্মচারীদের মাসিক বেতন শিট (Salary Sheet) প্রস্তুত ও ব্যাংক ট্রান্সফারের মাধ্যমে বিতরণ।</li>
        <li>সরকারি নিয়ম অনুযায়ী ভেন্ডর পেমেন্ট ও স্টাফ স্যালারি থেকে উৎসে কর (TDS) ও উৎসে ভ্যাট (VDS) সঠিকভাবে কর্তন করে সরকারি কোষাগারে চালানের মাধ্যমে জমা দেওয়া।</li>
      </ul>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">৫. অডিট প্রস্তুতি ও আর্থিক প্রতিবেদন (Audit & Reporting)</h3>
      <p class="mb-4 leading-relaxed">এনজিও ব্যুরো ও ডোনারদের সন্তুষ্টির জন্য প্রতি বছর অভ্যন্তরীণ এবং বাহ্যিক অডিট (Internal & External Audit) সম্পন্ন করতে হয়। অডিটরদের চাহিত সমস্ত বিল-ভাউচার ফাইল গুছিয়ে রাখা এবং বাৎসরিক ইনকাম-এক্সপেন্ডিচার ও ব্যালেন্স শিট প্রস্তুত করা হিসাব কর্মকর্তার অন্যতম গুরুত্বপূর্ণ দায়িত্ব।</p>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">৬. প্রয়োজনীয় সফটওয়্যার ও দক্ষতা</h3>
      <p class="mb-4 leading-relaxed">বর্তমানে বেশিরভাগ এনজিওতে <strong>Tally Prime</strong>, <strong>QuickBooks</strong> অথবা নিজস্ব কাস্টমাইজড ERP সফটওয়্যারে এন্ট্রি দেওয়া হয়। এর সাথে মাইক্রোসফট এক্সেলে (MS Excel) উন্নত দক্ষতা থাকলে এনজিও সেক্টরে দ্রুত পদোন্নতি পাওয়া যায়।</p>
    `,
    downloadFile: {
      name: "NGO_হিসাব_রক্ষণ_ও_দৈনন্দিন_কাজের_চেকলিস্ট.pdf",
      type: "pdf",
      size: "4.1 MB",
      downloads: 1890,
      url: "#"
    }
  },
  {
    id: 10,
    title: "হাতে-কলমে এনজিও (NGO) স্যালারি শিট তৈরি: নতুন হিসাব রক্ষকদের জন্য পূর্ণাঙ্গ বাস্তবসম্মত গাইড",
    category: "ক্যারিয়ার ও ফ্রিল্যান্সিং",
    date: "১৫ অক্টোবর ২০২৬",
    readTime: "৮ মিনিট পাঠ",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    summary: "এনজিওতে কর্মকর্তা ও মাঠকর্মীদের মাসিক বেতন শিট তৈরির নিখুঁত ধাপ—হাজিরা যাচাই, বেসিক ও বিভিন্ন ভাতা নির্ধারণ, প্রভিডেন্ট ফান্ড ও ট্যাক্স কর্তন এবং ব্যাংক অ্যাডভাইস তৈরির বাস্তব নিয়ম।",
    content: `
      <p class="mb-4 leading-relaxed">একজন নতুন হিসাব রক্ষক (Accounts Officer) হিসেবে কোনো এনজিওতে যোগদানের পর মাসের ২৫ থেকে ২৮ তারিখের মধ্যে যে কাজটি সবচেয়ে বেশি দায়িত্ব ও সতর্কতার সাথে করতে হয়, তা হলো—<strong>সকল কর্মকর্তা ও কর্মচারীর মাসিক স্যালারি শিট (Salary Sheet / Payroll) তৈরি</strong>। একটি ছোট ভুলের কারণে কোনো কর্মীর বেতন কম-বেশি হতে পারে বা প্রজেক্ট অডিটে আপত্তি উঠতে পারে।</p>
      
      <p class="mb-4 leading-relaxed">এই ব্লগে আমরা ধাপে ধাপে দেখাবো কীভাবে একদম বাস্তবসম্মত উপায়ে এক্সেল (Excel) বা সফটওয়্যারে একটি নির্ভুল এনজিও স্যালারি শিট তৈরি করবেন।</p>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">ধাপ ১: ইনপুট ডাটা ও উপস্থিতি সংগ্রহ (Attendance & Leave Verification)</h3>
      <p class="mb-4 leading-relaxed">মাসের ২৫ তারিখের মধ্যে এইচআর (HR) বা অ্যাডমিন ডিপার্টমেন্ট থেকে কর্মীদের উপস্থিতির রেজিস্টার সংগ্রহ করতে হবে:</p>
      <ul class="list-disc list-inside space-y-2 mb-4 leading-relaxed">
        <li>কে কতদিন উপস্থিত ছিলেন এবং অনুমোদিত ছুটি (Casual Leave বা Sick Leave) কয়টি নিয়েছেন।</li>
        <li>অননুমোদিত ছুটি বা বেতনবিহীন ছুটি (Leave Without Pay - LWP) থাকলে তা চিহ্নিত করুন (এর জন্য বেতন কাটা যাবে)।</li>
        <li>মাসের মাঝামাঝি কোনো নতুন কর্মী জয়েন করলে বা পদত্যাগ করলে তার প্রকৃত কর্মদিবসের অনুপাত (Pro-rata Basis) হিসাব করতে হবে।</li>
      </ul>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">ধাপ ২: প্রজেক্ট কোড ও টাইম শিট (Project Allocation / LoE)</h3>
      <p class="mb-4 leading-relaxed">এনজিওর সাধারণ অফিসের সাথে বাণিজ্যিক অফিসের মূল পার্থক্য এখানেই। কোনো কর্মী হয়তো সম্পূর্ণ একটি প্রজেক্টে কাজ করেন, আবার কেউ হয়তো একাধিক ডোনার প্রজেক্টে ৫০%-৫০% সময় দেন। স্যালারি শিটে অবশ্যই কর্মীর নামের পাশে নির্দিষ্ট <strong>Project Code / Donor Name</strong> উল্লেখ করতে হবে, যাতে অডিটের সময় কোন ডোনার ফান্ড থেকে কত টাকা বেতন দেওয়া হলো তা স্পষ্ট থাকে।</p>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">ধাপ ৩: বেতনের বিভিন্ন উপাদান (Gross Salary Calculation)</h3>
      <p class="mb-4 leading-relaxed">নিয়োগপত্র (Appointment Letter) অনুযায়ী কর্মীর মোট গ্রস স্যালারিকে নিচের খাতগুলোতে ভাগ করা থাকে:</p>
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4 text-sm font-mono leading-relaxed">
        <strong>Gross Salary = Basic + House Rent + Medical Allowance + Conveyance + Other Allowance</strong>
      </div>
      <ul class="list-disc list-inside space-y-2 mb-4 leading-relaxed">
        <li><strong>মূল বেতন (Basic Salary):</strong> মোট বেতনের সাধারণত ৫০% থেকে ৬০%।</li>
        <li><strong>বাড়ি ভাড়া (House Rent):</strong> বেসিকের ৪০% থেকে ৫০%।</li>
        <li><strong>চিকিৎসা ভাতা (Medical):</strong> সাধারণত ১০% বা নির্দিষ্ট ফিক্সড অ্যামাউন্ট (যেমন: ১,৫০০ বা ২,০০০ টাকা)।</li>
        <li><strong>যাতায়াত ও অন্যান্য ভাতা (Conveyance & Mobile Allowance)।</strong></li>
      </ul>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">ধাপ ৪: বাধ্যতামূলক কর্তনসমূহ (Deductions)</h3>
      <p class="mb-4 leading-relaxed">গ্রস বেতন থেকে নির্ধারিত নিয়ম অনুযায়ী অর্থ কর্তন করা হয়:</p>
      <ol class="list-decimal list-inside space-y-2 mb-4 leading-relaxed">
        <li><strong>প্রভিডেন্ট ফান্ড (PF Deduction):</strong> সাধারণত মূল বেতনের (Basic) ১০% কর্তন করা হয়। এনজিও নিজেও সমপরিমাণ টাকা ম্যাচিং ফান্ড হিসেবে জমা দেয়।</li>
        <li><strong>উৎস কর (Income Tax / TDS):</strong> কর্মীর বাৎসরিক আয় করসীমা অতিক্রম করলে সরকারি নিয়ম অনুযায়ী মাসিক আনুপাতিক ট্যাক্স কাটতে হবে।</li>
        <li><strong>স্টাফ লোন বা অগ্রিম বেতন (Loan / Advance Deduction):</strong> কোনো কর্মী পূর্ববর্তী মাসে অগ্রিম বেতন বা অফিস লোন নিয়ে থাকলে তার মাসিক কিস্তি কর্তন।</li>
        <li><strong>অনুপস্থিতির কর্তন (LWP):</strong> <code>(Gross Salary ÷ মাসের মোট দিন) × অনুপস্থিতির দিন</code> হিসেবে বাদ দিতে হবে।</li>
      </ol>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">ধাপ ৫: নিট প্রদেয় বেতন (Net Payable Salary)</h3>
      <div class="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 mb-4 text-sm font-bold text-brand-700 dark:text-brand-300">
        Net Payable Salary = মোট গ্রস বেতন (Gross Salary) - মোট কর্তন (Total Deductions)
      </div>

      <h3 class="text-xl font-bold mt-6 mb-3 text-brand-600 dark:text-brand-400">ধাপ ৬: ব্যাংক ট্রান্সফার লেটার ও পে-স্লিপ (Bank Advice & Pay Slip)</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 leading-relaxed">
        <li>স্যালারি শিট প্রস্তুতের পর নির্বাহী পরিচালক (ED) বা প্রজেক্ট ডিরেক্টরের অনুমোদন ও স্বাক্ষর নিতে হবে।</li>
        <li>ব্যাংককে একটি অফিশিয়াল চিঠি (Bank Advice Letter) পাঠাতে হবে, যেখানে কর্মীদের নাম, ব্যাংক অ্যাকাউন্ট নম্বর এবং নিট বেতনের অঙ্ক উল্লেখ থাকবে। সাথে এনজিওর প্রধান একাউন্ট পেয়ী চেক সংযুক্ত থাকবে।</li>
        <li>টাকা অ্যাকাউন্টে জমা হওয়ার পর প্রতিটি কর্মীকে তাদের বেতনের বিস্তারিত ব্রেকডাউন সম্বলিত <strong>Pay Slip</strong> মেইলে পাঠানো বা প্রিন্ট কপি প্রদান করা হিসাব রক্ষকের পেশাদারিত্বের প্রমাণ।</li>
      </ul>
    `,
    downloadFile: {
      name: "NGO_Salary_Sheet_Formula_Excel_Template.xlsx",
      type: "excel",
      size: "14 KB",
      downloads: 2470,
      url: "https://docs.google.com/spreadsheets/d/1gxvdCKTiAcHJzrv-7MYUu0GrVtUpiJuk/edit?usp=sharing&ouid=105369747990797233343&rtpof=true&sd=true"
    }
  }
];

// ক্যাটাগরি তালিকা (স্বয়ংক্রিয়ভাবে ফিল্টার বাটন তৈরির জন্য)
const CATEGORIES = [
  "সব ক্যাটাগরি",
  "ব্যবসা ও ক্ষুদ্র ঋণ",
  "শিক্ষা ও প্রস্তুতি",
  "কম্পিউটার ও আইটি",
  "ক্যারিয়ার ও ফ্রিল্যান্সিং",
  "সফটওয়্যার ও টুলস"
];



