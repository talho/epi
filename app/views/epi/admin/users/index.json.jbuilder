
json.array! @users do |user|
  json.(user, :id)
  json.name user.display_name
end
