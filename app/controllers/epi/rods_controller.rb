class Epi::RodsController < ApplicationController
  respond_to :json
  
  def search
    detail = Epi::UserDetail.find_or_create_by_user_id(current_user.id)
    raise "You must designate a database for this user" if detail.rods_database.blank?
    
    adt = Epi::RODS::ADT.connect(detail.rods_database)
    start_date = begin Date.parse(params[:start_date]).to_time.at_beginning_of_day.utc.change(hour:0) rescue 7.days.ago.to_time.change(hour:0) end
    end_date = begin Date.parse(params[:end_date]).to_time.at_beginning_of_day.utc.change(hour:23, min: 59, sec: 59, usec: 999) rescue Time.now.utc.change(hour:23, min: 59, sec: 59, usec: 999) end
    
    # Filter based on param options
    adt = adt.where(h_date_admitted: start_date .. end_date)
    adt = adt.where(h_patient_age_grp_id: case params[:age] when 'a' then 'D' when 'c' then 'C' else nil end ) unless params[:age].blank?
    adt = adt.where(h_patient_gender: params[:gender].upcase ) unless params[:gender].blank?
    adt = adt.where(h_patient_addr_zipcd: params[:patient_zip]) unless params[:patient_zip].blank?
    adt = adt.where(h_sndng_fclty: params[:facility]) unless params[:facility].blank?
    adt = adt.where(h_sndng_fclty: detail.rods_facilities.split(','))
        
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
    
  def providers
    detail = Epi::UserDetail.find_or_create_by_user_id(current_user.id)
    raise "You must designate a database for this user" if detail.rods_database.blank?
    
    p = Epi::RODS::Provider.connect(detail.rods_database)
    respond_with(@providers = p.where(p_pid: detail.rods_facilities.split(',')))
  end
end