class Epi::UserDetail < ActiveRecord::Base
  validates :user_id, :uniqueness => true
  
  belongs_to :user
end