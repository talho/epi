class Epi::Admin::UsersController < ApplicationController
  respond_to :json
  
  def index
    respond_with(@users = User.with_app(:epi).where("roles.public" => false).uniq)
  end
  
  def rods_databases
    # open up the yml file, output the databases
    config = YAML.load(File.read(Rails.root.join('config', 'epi_connections.yml'))).with_indifferent_access
    respond_with(@rods = config.keys, @detail = Epi::UserDetail.where(user_id: params[:user_id]).first)
  end
  
  def update    
    raise "You must be a super admin to make changes to any User" unless current_user.is_super_admin?(:epi)

    @detail = UserDetail.find_or_create_by_user_id(params[:id])
    @detail.update_attributes params[:user_detail]
    respond_with @detail
  end
  
  def facilities
    # connect to the database for the user that we're editing
    @detail = UserDetail.find_or_create_by_user_id(params[:user_id])
    fac = Epi::RODS::Provider.connect(@detail.rods_database)
    # output all facilities, cross referenced by the ones that the user has access to
    respond_with(@facilities = fac.all, @user_facilities = @detail.rods_facilities.split(','))
  end
end