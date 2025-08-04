import { useTheme } from '../Context/ThemeContext';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { GrLocationPin } from 'react-icons/gr';
import { IoIosCall } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark' | 'colorful';

export default function Contact() {
  const { theme } = useTheme();
  const current: ThemeType = (theme as ThemeType) || 'light';
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await new Promise(r => setTimeout(r, 800));
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    if (status === 'sent' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const outerBg =
    current === 'light'
      ? 'bg-gray-50'
      : current === 'dark'
      ? 'bg-black'
      : 'bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-500';
  const sectionBg =
    current === 'light'
      ? 'bg-white'
      : current === 'dark'
      ? 'bg-[#1e1f36]'
      : 'bg-white/10 backdrop-blur-sm'; 

  const textColor = current === 'light' ? 'text-gray-800' : 'text-gray-100';
  const subtleText = current === 'light' ? 'text-gray-600' : 'text-gray-300';

  return (
    <div className={`${outerBg} min-h-screen transition-colors duration-300`}>
      <section className="relative w-full h-[40vh] min-h-[220px] overflow-hidden flex items-center justify-center">
        <div
          className={`absolute inset-0 ${
            current === 'colorful'
              ? 'bg-gradient-to-br from-via-pink-500 to-purple-700/80'
              : current === 'dark'
              ? 'bg-black/70'
              : 'bg-white/60'
          }`}
        />
        <div className="relative z-10 text-center px-6">
          <h1
            className={`font-extrabold text-4xl md:text-6xl drop-shadow-lg ${
              current === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Get In Touch
          </h1>
          <p className={`mt-2 text-sm md:text-base max-w-xl mx-auto ${subtleText}`}>
            Whether you have a question, want to collaborate, or just say hi—our team is here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row gap-12">
        <aside
          className={`
            w-full lg:w-1/3 rounded-xl p-6 shadow-lg
            ${sectionBg} ${textColor}
            flex flex-col gap-6
          `}
        >
          <div>
            <h2 className="text-2xl font-semibold mb-2">Need Help?</h2>
            <p className="text-sm">{`Our support team is available 24/7. Explore the options below or drop us a line.`}</p>
          </div>
          <nav className="flex flex-col gap-3 text-sm">
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <span className="text-lg"></span> Help Center
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <span className="text-lg"></span> Support
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <span className="text-lg"></span> FAQs
            </a>
          </nav>

          <div className="mt-auto">
            <h3 className="text-lg font-medium mb-2">Contact Details</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <GrLocationPin className="text-primary text-xl" /> surat , Gujarat , India
              </p>
              <p className="flex items-center gap-2">
                <IoIosCall className="text-primary text-xl" /> +91 12345 67890
              </p>
              <p className="flex items-center gap-2">
                <MdEmail className="text-primary text-xl" /> multitheme@gmail.com
              </p>
            </div>
            <div className="flex gap-4 mt-4 text-xl">
              <a href="#" aria-label="LinkedIn" className="hover:scale-110 transition">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Twitter" className="hover:scale-110 transition">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="hover:scale-110 transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col gap-10">
          <section
            className={`
              rounded-xl p-8 shadow-lg
              ${sectionBg}
              transition
            `}
          >
            <div className="max-w-2xl mx-auto">
              <h2 className={`text-3xl font-bold mb-2 ${current === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Send Us a Message
              </h2>
              <p className={`text-sm mb-6 ${subtleText}`}>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-1 ${current === 'light' ? 'text-gray-700' : 'text-gray-200'}`}
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={`
                        w-full rounded-lg border px-4 py-2
                        bg-transparent outline-none
                        border-gray-400 placeholder:${current === 'light' ? 'text-gray-500' : 'text-gray-400'}
                        ${current === 'light' ? 'text-gray-800' : 'text-white'}
                        focus:ring-2 focus:ring-primary focus:border-transparent
                        transition
                      `}
                      placeholder="Mansi Ghantala"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-1 ${current === 'light' ? 'text-gray-700' : 'text-gray-200'}`}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={`
                        w-full rounded-lg border px-4 py-2
                        bg-transparent outline-none
                        border-gray-400 placeholder:${current === 'light' ? 'text-gray-500' : 'text-gray-400'}
                        ${current === 'light' ? 'text-gray-800' : 'text-white'}
                        focus:ring-2 focus:ring-primary focus:border-transparent
                        transition
                      `}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-1 ${current === 'light' ? 'text-gray-700' : 'text-gray-200'}`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className={`
                      w-full rounded-lg border px-4 py-3
                      bg-transparent outline-none resize-none
                      border-gray-400 placeholder:${current === 'light' ? 'text-gray-500' : 'text-gray-400'}
                      ${current === 'light' ? 'text-gray-800' : 'text-white'}
                      focus:ring-2 focus:ring-primary focus:border-transparent
                      transition
                    `}
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

   <button
  type="submit"
  disabled={status === 'sending'}
  className={`
    flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium
    text-white hover:brightness-125 hover:text-black transition
    ${status === 'sending' ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
    ${
      theme === 'colorful'
        ? 'bg-gradient-to-r from-yellow-400 to-pink-500'
        : theme === 'dark'
        ? 'bg-gradient-to-r from-blue-700 to-purple-700'
        : 'bg-gray-700'
    }
  `}
>
  {status === 'sending'
    ? 'Sending...'
    : status === 'sent'
    ? 'Sent Successfully'
    : 'Send Message'}
</button>

              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
