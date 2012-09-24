$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "epi/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "epi"
  s.version     = Epi::VERSION
  s.authors     = ["Charles DuBose"]
  s.email       = ["cdubose@texashan.org"]
  s.summary     = "Graphing tools for RODS/Essence/Biosense"

  s.files = Dir["{app,config,db,lib}/**/*"] + ["Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.2.8"
  s.add_dependency 'activerecord-sqlserver-adapter', "~> 3.2.8"
  s.add_dependency 'tiny_tds'
end
