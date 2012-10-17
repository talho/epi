class Epi::RODS::Provider < ActiveRecord::Base
  include Epi::Connection
  
  self.table_name = 'providers'  
end