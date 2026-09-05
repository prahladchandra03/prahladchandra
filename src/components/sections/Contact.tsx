import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, Mail, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { toast } from 'sonner';
import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import { profile } from '../../data/profile';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus('loading');
    try {
      // Configurable form submission — replace with your provider
      // For now, simulate a submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form data:', data);
      setStatus('success');
      toast.success('Message sent successfully!');
      reset();
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      toast.error('Failed to send message. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="section-container">
        <SectionHeader
          label="Get In Touch"
          title="Let's Build Something"
          description="Have a project in mind or want to discuss engineering challenges? Let's connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* SIDE Video Card */}
            <div className="relative rounded-2xl overflow-hidden border border-border-subtle mb-8 group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-48 object-cover"
              >
                <source src="/SIDE.mp4" type="video/mp4" />
              </video>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-0/80 via-transparent to-transparent" />
              {/* Live badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-0/70 backdrop-blur border border-border-subtle text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
                </span>
                <span className="text-accent-cyan">INTRO</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-fg mb-4">Contact Information</h3>
            <p className="text-fg-muted mb-8 leading-relaxed">
              I'm open to discussing full-stack development roles, backend architecture projects,
              and interesting engineering challenges.
            </p>

            <div className="space-y-4">
              <a
                href={profile.links.email}
                className="flex items-center gap-3 p-4 glass-card glass-card-hover group"
              >
                <Mail size={20} className="text-accent-cyan" />
                <div>
                  <div className="text-sm font-medium text-fg group-hover:text-accent-cyan transition-colors">
                    Email
                  </div>
                  <div className="text-xs text-fg-muted">{profile.email}</div>
                </div>
              </a>

              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 glass-card glass-card-hover group"
              >
                <GithubIcon size={20} className="text-accent-cyan" />
                <div>
                  <div className="text-sm font-medium text-fg group-hover:text-accent-cyan transition-colors">
                    GitHub
                  </div>
                  <div className="text-xs text-fg-muted">prahladchandra03</div>
                </div>
              </a>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 glass-card glass-card-hover group"
              >
                <LinkedinIcon size={20} className="text-accent-cyan" />
                <div>
                  <div className="text-sm font-medium text-fg group-hover:text-accent-cyan transition-colors">
                    LinkedIn
                  </div>
                  <div className="text-xs text-fg-muted">prahladchandra</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-6 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-fg mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border-subtle text-fg placeholder-fg-dim text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-fg mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border-subtle text-fg placeholder-fg-dim text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-fg mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border-subtle text-fg placeholder-fg-dim text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  'Message Sent! ✓'
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
