# Tell the main app that this extension exists
$extensions = [] unless defined?($extensions)
$extensions << :epi

# Build the menu in the $menu_config global variable
$menu_config = {} unless defined?($menu_config)
$menu_config[:epi] = <<EOF
  if current_user.has_non_public_role?('epi')
    nav = "{name: 'Epi-D', items:["
    nav += "]}"
  end
EOF

$extensions_css = {} unless defined?($extensions_css)
$extensions_css[:epi] = [ "rollcall/rollcall.css" ]
$extensions_js = {} unless defined?($extensions_js)
$extensions_js[:epi] = [ "rollcall/script_config.js" ]

module Epi
  autoload :Connection, 'epi/connection'
end

require "epi/engine"
