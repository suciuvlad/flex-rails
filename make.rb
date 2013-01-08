require "fileutils"
require "pathname"

FLEX_PATH = Pathname.new("/Users/vladsuciu/Dropbox/dev/Flex")
ASSETS_PATH = Pathname.new(File.dirname(__FILE__)).join("vendor", "assets")

JS_FILES  = %w(polyfills jquery.tooltip jquery.bubble jquery.dropdown jquery.message jquery.modal jquery.tab jquery.collapse)

# Clean and Recreate
FileUtils.remove_dir ASSETS_PATH, :force => true

FileUtils.mkdir_p ASSETS_PATH.join("stylesheets", "flex")
FileUtils.mkdir_p ASSETS_PATH.join("javascripts", "flex")
FileUtils.mkdir_p ASSETS_PATH.join("images", "flex")


# Copy Javascripts
FileUtils.cp_r FLEX_PATH.join("javascripts/."), ASSETS_PATH.join("javascripts", "flex")

# Copy Stylesheets
FileUtils.cp_r FLEX_PATH.join("scss/."), ASSETS_PATH.join("stylesheets", "flex")

# Copy Images
FileUtils.cp_r FLEX_PATH.join("images/."), ASSETS_PATH.join("images", "flex")

# INDEX FILES
# http://guides.rubyonrails.org/asset_pipeline.html - 2.1.2 Using index files

# css
File.open(ASSETS_PATH.join("stylesheets", "flex", "index.scss"), "w") do |file|
  file << "@import 'flex';"
end

# js
File.open(ASSETS_PATH.join("javascripts", "flex", "index.js"), "w") do |file|
  file << "/*\n"
  JS_FILES.each do |filename|
    file << "*= require 'flex/#{filename}.js'\n"
  end
  file << "*/"
end
