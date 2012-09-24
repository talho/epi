class Epi::RODS::SymptomSyndrome < ActiveRecord::Base
  include Epi::Connection
  
  self.table_name = 'symptom_syndrome'
  
  def self.syndrome_names
    self.uniq.pluck(:syndrome_name)
  end    
end