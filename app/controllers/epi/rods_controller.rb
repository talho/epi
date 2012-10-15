class Epi::RodsController < ApplicationController
  respond_to :json
  
  skip_before_filter :authorize
  
  def search
    adt = Epi::RODS::ADT.connect(:midland_rods)
    start_date = begin Date.parse(params[:start_date]) rescue 7.days.ago end
    end_date = begin Date.parse(params[:end_date]) rescue Time.now end
    adt = adt.where(h_date_admitted: start_date .. end_date) 
    adt = adt.group("DATEADD(d, DATEDIFF(d, 0, h_date_admitted),0)").order("DATEADD(d, DATEDIFF(d, 0, h_date_admitted),0)")
    unless params[:by_syndrome].blank?
      adt = adt.find_by_syndrome_name(params[:syndromes]).group("symptom_syndrome.syndrome_name").count
      @results = {}
      adt.each do |key, val|
        (@results[key[0]] ||= {date: key[0]})[key[1]] = val
      end
    else
      @results = adt.select("DATEADD(d, DATEDIFF(d, 0, h_date_admitted),0) as date, COUNT(*) as total")
    end
    respond_with(@results)
  end
    
  def options
    ss = Epi::RODS::SymptomSyndrome.connect(:midland_rods)
    respond_with(@options = {
      syndromes: ss.syndrome_names
    })
  end
end