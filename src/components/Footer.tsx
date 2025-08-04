    function Footer() {
    return (
        <footer
        className="w-full mt-auto py-6 px-4 text-sm"
        style={{
            background: 'var(--card-bg)',
            color: 'var(--text)',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
        }}
        >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <p>&copy; {new Date().getFullYear()} Multi-Theme Switcher. All rights reserved.</p>

            <div className="flex gap-4 flex-wrap justify-center md:justify-end">
            <a href="#" className="text-muted hover:text-primary transition">Privacy</a>
            <a href="#" className="text-muted hover:text-primary transition">Terms</a>
            <a href="#" className="text-muted hover:text-primary transition">Support</a>
            </div>
        </div>
        </footer>
    );
    }

    export default Footer;
