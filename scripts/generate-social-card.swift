import AppKit
import Foundation

struct Palette {
  static let pageBackground = NSColor(hex: 0xF2F4F8)
  static let surface = NSColor(hex: 0xFFFFFF)
  static let surfaceMuted = NSColor(hex: 0xF8FAFC)
  static let surfaceStrong = NSColor(hex: 0x0F1B2F)
  static let border = NSColor(hex: 0xDBE3F4)
  static let borderStrong = NSColor(hex: 0x21385F)
  static let copy = NSColor(hex: 0x334155)
  static let copyStrong = NSColor(hex: 0x0F172A)
  static let copyMuted = NSColor(hex: 0x64748B)
  static let primary = NSColor(hex: 0x2F63FF)
  static let primaryStrong = NSColor(hex: 0x183FCB)
  static let primarySoft = NSColor(hex: 0xEEF4FF)
}

extension NSColor {
  convenience init(hex: Int, alpha: CGFloat = 1) {
    self.init(
      red: CGFloat((hex >> 16) & 0xFF) / 255,
      green: CGFloat((hex >> 8) & 0xFF) / 255,
      blue: CGFloat(hex & 0xFF) / 255,
      alpha: alpha
    )
  }
}

enum SocialCardError: Error, LocalizedError {
  case missingAvatar
  case missingBitmapImageRep
  case pngEncodingFailed

  var errorDescription: String? {
    switch self {
    case .missingAvatar:
      return "아바타 이미지를 찾지 못했습니다."
    case .missingBitmapImageRep:
      return "비트맵 이미지 렌더링에 실패했습니다."
    case .pngEncodingFailed:
      return "PNG 데이터를 생성하지 못했습니다."
    }
  }
}

func makeParagraphStyle(alignment: NSTextAlignment = .left, lineHeight: CGFloat = 1.0) -> NSMutableParagraphStyle {
  let style = NSMutableParagraphStyle()
  style.alignment = alignment
  style.lineBreakMode = .byWordWrapping
  style.lineHeightMultiple = lineHeight
  return style
}

func drawText(
  _ text: String,
  in rect: NSRect,
  font: NSFont,
  color: NSColor,
  kern: CGFloat = 0,
  lineHeight: CGFloat = 1.0,
  alignment: NSTextAlignment = .left
) {
  let attributes: [NSAttributedString.Key: Any] = [
    .font: font,
    .foregroundColor: color,
    .kern: kern,
    .paragraphStyle: makeParagraphStyle(alignment: alignment, lineHeight: lineHeight),
  ]

  NSString(string: text).draw(in: rect, withAttributes: attributes)
}

func drawCenteredText(
  _ text: String,
  in rect: NSRect,
  font: NSFont,
  color: NSColor,
  kern: CGFloat = 0
) {
  let attributes: [NSAttributedString.Key: Any] = [
    .font: font,
    .foregroundColor: color,
    .kern: kern,
    .paragraphStyle: makeParagraphStyle(alignment: .center),
  ]
  let textSize = NSString(string: text).size(withAttributes: attributes)
  let centeredRect = NSRect(
    x: rect.minX,
    y: rect.minY + floor((rect.height - ceil(textSize.height)) / 2) - 1,
    width: rect.width,
    height: ceil(textSize.height) + 2
  )

  NSString(string: text).draw(in: centeredRect, withAttributes: attributes)
}

func fill(_ rect: NSRect, color: NSColor) {
  color.setFill()
  NSBezierPath(rect: rect).fill()
}

func stroke(_ rect: NSRect, color: NSColor, lineWidth: CGFloat = 1) {
  let path = NSBezierPath(rect: rect)
  path.lineWidth = lineWidth
  color.setStroke()
  path.stroke()
}

func drawLine(from start: NSPoint, to end: NSPoint, color: NSColor, lineWidth: CGFloat = 1) {
  let path = NSBezierPath()
  path.move(to: start)
  path.line(to: end)
  path.lineWidth = lineWidth
  color.setStroke()
  path.stroke()
}

func drawBadge(text: String, rect: NSRect) {
  fill(rect, color: Palette.primaryStrong)
  drawCenteredText(
    text,
    in: rect,
    font: .monospacedSystemFont(ofSize: 26, weight: .bold),
    color: .white,
    kern: 1.2
  )
}

func drawChip(text: String, origin: NSPoint) {
  let paddingX: CGFloat = 22
  let font = NSFont.monospacedSystemFont(ofSize: 17, weight: .semibold)
  let textSize = NSString(string: text).size(withAttributes: [.font: font])
  let rect = NSRect(
    x: origin.x,
    y: origin.y,
    width: ceil(textSize.width) + paddingX * 2 + 12,
    height: 56
  )

  fill(rect, color: Palette.surface)
  stroke(rect, color: Palette.border)

  drawCenteredText(text, in: rect, font: font, color: Palette.copyStrong, kern: 0.2)
}

func drawAspectFill(image: NSImage, in rect: NSRect) {
  guard image.size.width > 0, image.size.height > 0 else { return }

  NSGraphicsContext.saveGraphicsState()
  let clipPath = NSBezierPath(rect: rect)
  clipPath.addClip()

  let scale = max(rect.width / image.size.width, rect.height / image.size.height)
  let drawSize = NSSize(width: image.size.width * scale, height: image.size.height * scale)
  let drawRect = NSRect(
    x: rect.midX - drawSize.width / 2,
    y: rect.midY - drawSize.height / 2,
    width: drawSize.width,
    height: drawSize.height
  )

  image.draw(in: drawRect)
  NSGraphicsContext.restoreGraphicsState()
}

func drawAccentShapes(canvasRect: NSRect) {
  let topGlow = NSBezierPath(ovalIn: NSRect(x: 880, y: -140, width: 420, height: 420))
  NSColor(hex: 0x5B8EFF, alpha: 0.12).setFill()
  topGlow.fill()

  let softGlow = NSBezierPath(ovalIn: NSRect(x: 620, y: 320, width: 320, height: 320))
  NSColor(hex: 0x183FCB, alpha: 0.06).setFill()
  softGlow.fill()

  fill(NSRect(x: 0, y: 0, width: canvasRect.width, height: 84), color: Palette.primarySoft)
  fill(NSRect(x: 0, y: 84, width: canvasRect.width, height: 1), color: Palette.border)
  drawLine(
    from: NSPoint(x: 742, y: 84),
    to: NSPoint(x: 742, y: canvasRect.height - 52),
    color: Palette.border
  )

  for x in stride(from: 72 as CGFloat, through: 702, by: 52) {
    drawLine(
      from: NSPoint(x: x, y: 520),
      to: NSPoint(x: x, y: 582),
      color: NSColor(hex: 0xDCE8FF, alpha: 0.7)
    )
  }
}

func drawSocialCard(canvasRect: NSRect, avatar: NSImage) {
  fill(canvasRect, color: Palette.pageBackground)
  drawAccentShapes(canvasRect: canvasRect)

  let rightPanelRect = NSRect(x: 790, y: 116, width: 338, height: 484)
  fill(rightPanelRect, color: Palette.surfaceStrong)
  stroke(rightPanelRect, color: Palette.borderStrong)

  fill(NSRect(x: 810, y: 138, width: 298, height: 6), color: Palette.primary)
  drawText(
    "blog.cdd.co.kr",
    in: NSRect(x: 72, y: 28, width: 320, height: 32),
    font: .systemFont(ofSize: 20, weight: .bold),
    color: Palette.primaryStrong,
    kern: 0.2
  )

  drawBadge(text: "CDD", rect: NSRect(x: 72, y: 116, width: 88, height: 88))

  drawText(
    "디디의\n개발일지",
    in: NSRect(x: 72, y: 232, width: 620, height: 220),
    font: .systemFont(ofSize: 86, weight: .bold),
    color: Palette.copyStrong,
    lineHeight: 0.92
  )

  drawText(
    "개발 경험, 회고, 그리고 사이드 프로젝트를\n기록하는 개인 개발 블로그",
    in: NSRect(x: 76, y: 430, width: 560, height: 100),
    font: .systemFont(ofSize: 28, weight: .medium),
    color: Palette.copy,
    lineHeight: 1.18
  )

  drawChip(text: "Development", origin: NSPoint(x: 72, y: 544))
  drawChip(text: "Retrospective", origin: NSPoint(x: 280, y: 544))
  drawChip(text: "Side Project", origin: NSPoint(x: 530, y: 544))

  drawText(
    "CDD DEVLOG",
    in: NSRect(x: 820, y: 158, width: 260, height: 28),
    font: .monospacedSystemFont(ofSize: 22, weight: .bold),
    color: Palette.surface,
    kern: 1.0
  )

  drawText(
    "PERSONAL NOTES",
    in: NSRect(x: 820, y: 190, width: 220, height: 22),
    font: .monospacedSystemFont(ofSize: 15, weight: .medium),
    color: NSColor(hex: 0x91B8FF),
    kern: 0.8
  )

  let avatarFrame = NSRect(x: 820, y: 224, width: 278, height: 286)
  fill(avatarFrame, color: Palette.surfaceMuted)
  drawAspectFill(image: avatar, in: avatarFrame)
  stroke(avatarFrame, color: Palette.borderStrong)

  let footerBadgeRect = NSRect(
    x: rightPanelRect.midX - 70,
    y: 544,
    width: 140,
    height: 34
  )
  fill(footerBadgeRect, color: Palette.primaryStrong)
  drawCenteredText(
    "SINCE 2024",
    in: footerBadgeRect,
    font: .monospacedSystemFont(ofSize: 13, weight: .bold),
    color: .white,
    kern: 0.4
  )

}

final class SocialCardView: NSView {
  let avatar: NSImage

  init(frame frameRect: NSRect, avatar: NSImage) {
    self.avatar = avatar
    super.init(frame: frameRect)
  }

  @available(*, unavailable)
  required init?(coder: NSCoder) {
    nil
  }

  override var isFlipped: Bool {
    true
  }

  override func draw(_ dirtyRect: NSRect) {
    super.draw(dirtyRect)
    drawSocialCard(canvasRect: bounds, avatar: avatar)
  }
}

func renderSocialCard(avatar: NSImage, outputURL: URL) throws {
  let canvasRect = NSRect(x: 0, y: 0, width: 1200, height: 630)
  let view = SocialCardView(frame: canvasRect, avatar: avatar)

  guard let bitmap = view.bitmapImageRepForCachingDisplay(in: canvasRect) else {
    throw SocialCardError.missingBitmapImageRep
  }

  view.cacheDisplay(in: canvasRect, to: bitmap)

  guard let pngData = bitmap.representation(using: .png, properties: [:]) else {
    throw SocialCardError.pngEncodingFailed
  }

  try pngData.write(to: outputURL, options: .atomic)
}

func main() throws {
  let rootURL = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
  let avatarURL = rootURL.appendingPathComponent("public/static/images/avatar.png")
  let outputURL = rootURL.appendingPathComponent("public/static/images/twitter-card.png")

  guard let avatar = NSImage(contentsOf: avatarURL) else {
    throw SocialCardError.missingAvatar
  }

  try renderSocialCard(avatar: avatar, outputURL: outputURL)
  print("Generated: \(outputURL.path)")
}

do {
  try main()
} catch {
  fputs("\(error.localizedDescription)\n", stderr)
  exit(1)
}
