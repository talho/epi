module Epi
  class Engine < ::Rails::Engine
    isolate_namespace Epi
    
    config.after_initialize do 
      begin
        $public_roles = [] unless defined?($public_roles)
        r = Role.find_by_name_and_application('Epi', 'public')
        $public_roles << r.id unless r.nil?
      rescue
      end
    end
    
    config.to_prepare do
    end
  end
end
