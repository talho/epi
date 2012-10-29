class CreateUserDetails < ActiveRecord::Migration
  def change
    create_table :epi_user_details do |t|
      t.id :user_id
      t.string :rods_database
      t.text :rods_facilities
    end
  end
end