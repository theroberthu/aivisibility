export default function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-sm text-secondary leading-relaxed max-w-md mx-auto">
          AI Visibility Checker is built by Robert Hu — an e-commerce operator
          focused on how AI is changing product discovery.
        </p>
        <p className="mt-6 text-xs text-muted">
          &copy; {new Date().getFullYear()} AI Visibility Checker
        </p>
      </div>
    </footer>
  );
}
