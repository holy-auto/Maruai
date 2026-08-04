export function SiteFooter() {
  return (
    <footer className="w-full bg-foreground-900 text-background-200 py-10 md:py-12">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-primary-500 rounded-md">
                <i className="ri-home-smile-line text-background-50 text-lg"></i>
              </div>
              <span className="font-heading font-bold text-lg text-background-50">
                丸愛装業
              </span>
            </div>
            <p className="text-base text-background-400 leading-relaxed">
              阿見町の外壁・屋根塗装専門店
              <br />
              街の塗装屋さんから知り合いの塗装屋さんを目指して
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-base text-background-100 mb-3">
              サイトマップ
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: "HOME", href: "/" },
                { label: "サービス", href: "/services" },
                { label: "料金", href: "/price" },
                { label: "施工事例", href: "/works" },
                { label: "お客様の声", href: "/voice" },
                { label: "よくある質問", href: "/faq" },
                { label: "コラム", href: "/blog" },
                { label: "会社概要", href: "/company" },
                { label: "お問い合わせ", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-base text-background-400 hover:text-background-100 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-base text-background-100 mb-3">
              お問い合わせ
            </h4>
            <p className="text-base text-background-400 mb-2">
              〒300-0325
              <br />
              茨城県稲敷郡阿見町上条888
            </p>
            <p className="text-base text-background-400 mb-1">
              TEL:{" "}
              <a href="tel:029-886-7913" className="text-background-200 hover:text-background-50">
                029-886-7913
              </a>
            </p>
            <p className="text-base text-background-400">
              FAX: 029-886-5499
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://line.me/ti/p/UxXZqXMSWE"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-green-500 rounded-md text-background-50 hover:bg-green-600 transition-colors"
              >
                <i className="ri-line-fill"></i>
              </a>
              <a
                href="https://www.instagram.com/maruaisougyou"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-md text-background-50 hover:opacity-90 transition-opacity"
              >
                <i className="ri-instagram-line"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background-700/50 text-center">
          <p className="text-sm text-background-500">
            © 2026 株式会社 丸愛装業 All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}