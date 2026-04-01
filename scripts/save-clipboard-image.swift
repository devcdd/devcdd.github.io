import AppKit
import Foundation

struct Options {
  var dir: String?
  var name: String?
  var alt: String = ""
}

enum ClipboardSaveError: Error, LocalizedError {
  case invalidDirectory
  case invalidName
  case missingClipboardImage
  case pngEncodingFailed

  var errorDescription: String? {
    switch self {
    case .invalidDirectory:
      return "--dir 값이 올바르지 않습니다."
    case .invalidName:
      return "--name 값이 올바르지 않습니다."
    case .missingClipboardImage:
      return "클립보드에 이미지가 없습니다."
    case .pngEncodingFailed:
      return "PNG 데이터 생성에 실패했습니다."
    }
  }
}

func parseOptions() -> Options {
  var options = Options()
  let arguments = Array(CommandLine.arguments.dropFirst())
  var index = 0

  while index < arguments.count {
    let argument = arguments[index]

    switch argument {
    case "--dir":
      index += 1
      if index < arguments.count {
        options.dir = arguments[index]
      }
    case "--name":
      index += 1
      if index < arguments.count {
        options.name = arguments[index]
      }
    case "--alt":
      index += 1
      if index < arguments.count {
        options.alt = arguments[index]
      }
    default:
      break
    }

    index += 1
  }

  return options
}

func validateDirectory(_ value: String?) -> String? {
  guard let value else { return nil }
  let normalized = value.trimmingCharacters(in: .whitespacesAndNewlines)

  if normalized.isEmpty || normalized.contains("..") {
    return nil
  }

  return normalized.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
}

func sanitizeName(_ value: String?) -> String? {
  guard let value else { return nil }

  let normalized = value
    .trimmingCharacters(in: .whitespacesAndNewlines)
    .replacingOccurrences(of: "[/\\\\:\\n\\r\\t]+", with: "-", options: .regularExpression)
    .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)

  return normalized.isEmpty ? nil : normalized
}

func main() throws {
  let options = parseOptions()

  guard let directory = validateDirectory(options.dir) else {
    throw ClipboardSaveError.invalidDirectory
  }

  guard let name = sanitizeName(options.name) else {
    throw ClipboardSaveError.invalidName
  }

  let pasteboard = NSPasteboard.general
  guard let image = NSImage(pasteboard: pasteboard) else {
    throw ClipboardSaveError.missingClipboardImage
  }

  guard
    let tiffData = image.tiffRepresentation,
    let bitmap = NSBitmapImageRep(data: tiffData),
    let pngData = bitmap.representation(using: .png, properties: [:])
  else {
    throw ClipboardSaveError.pngEncodingFailed
  }

  let fileName = "\(name).png"
  let outputDirectory = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
    .appendingPathComponent("public/static/images/\(directory)", isDirectory: true)
  let outputFile = outputDirectory.appendingPathComponent(fileName)

  try FileManager.default.createDirectory(at: outputDirectory, withIntermediateDirectories: true)
  try pngData.write(to: outputFile, options: .atomic)

  let publicPath = "/static/images/\(directory)/\(fileName)"

  print("Saved: \(outputFile.path)")
  print("")
  print("MDX:")
  print("<img src=\"\(publicPath)\" alt=\"\(options.alt)\" className=\"w-full\" />")
}

do {
  try main()
} catch {
  fputs("\(error.localizedDescription)\n", stderr)
  exit(1)
}
