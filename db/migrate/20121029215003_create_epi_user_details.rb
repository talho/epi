class CreateEpiUserDetails < ActiveRecord::Migration
  def change
    create_table :epi_user_details do |t|
      t.references :user
      t.string :rods_database, :default => ''
      t.text :rods_facilities, :default => ''
    end
  end
end
