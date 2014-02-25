# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "flex/version"

Gem::Specification.new do |s|
  s.name        = "flex"
  s.version     = Flex::VERSION
  s.authors     = ["Vlad Suciu"]
  s.email       = ["suciu.vlad@gmail.com"]
  s.homepage    = "http://flex.fyvesmedia.com"
  s.summary     = %q{ A responsive and modular front-end framework closely following the SMACSS naming conventions and concepts. }
  s.description = %q{ A responsive and modular front-end framework closely following the SMACSS naming conventions and concepts. }

  s.rubyforge_project = "flex"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # specify any dependencies here; for example:
  # s.add_development_dependency "rspec"

  s.add_development_dependency "rake"
  s.add_dependency "railties", ">= 3.2.2"
  s.add_dependency "compass", [">= 0.12.2"]
  s.add_dependency "sass", [">= 3.2.0"]
  s.add_dependency "modular-scale", [">= 1.0.2"]
end
