# select all syndromes
# "select * from symptom_coding join hl7_adts on sid = h_sid join symptom_syndrome ON symptom_0 = symptommask_0 AND symptom_1 = symptommask_1 where (symptom_0 != 0 OR symptom_1 != 0)"

class Epi::RODS::ADT < ActiveRecord::Base
  include Epi::Connection
  
  self.table_name = 'hl7_adts'
  self.primary_key = 'H_SID'
    
  def self.find_by_syndrome_name(str_or_array)
    joins("JOIN symptom_coding ON sid = h_sid JOIN symptom_syndrome ON (symptom_0 & symptommask_0) > 0 OR (symptom_1 & symptommask_1) > 0").where("symptom_syndrome.syndrome_name" => str_or_array)
  end
end