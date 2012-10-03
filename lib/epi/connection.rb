module Epi
  module Connection
    def self.included(base)
      base.class_variable_set("@@connected", {}.with_indifferent_access)
      base.send :extend, ClassMethods
    end
    
    module ClassMethods
      def connect(connection_name)
        self.class_variable_get("@@connected")[connection_name] ||= begin
          adt = self.dup
          config = YAML.load(File.read(Rails.root.join('config', 'epi_connections.yml'))).with_indifferent_access
          adt.establish_connection(config[connection_name])
          adt.reset_column_information
          adt
        end
      end
    end   
  end
end