# Tell the main app that this extension exists
$extensions = [] unless defined?($extensions)
$extensions << :epi

# Build the menu in the $menu_config global variable
$menu_config = {} unless defined?($menu_config)
$menu_config[:epi] = <<EOF
  if current_user.has_non_public_role?('epi')
    nav = "{name: 'Epi-D', items:["
    nav += "{name: 'RODS', tab:{id: 'epi_rods', title:'RODS', initializer: 'Talho.Epi.RODS'}}"
    nav += "]}"
  end
EOF

$extensions_css = {} unless defined?($extensions_css)
$extensions_css[:epi] = [ "epi/epi.css" ]
$extensions_js = {} unless defined?($extensions_js)
$extensions_js[:epi] = [ "epi/script_config.js" ]

module Epi
  autoload :Connection, 'epi/connection'
end

require "epi/engine"
