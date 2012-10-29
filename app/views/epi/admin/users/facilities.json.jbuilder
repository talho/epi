
json.array! @facilities do |fac|
  json.name     fac[:P_NAME]
  json.id       fac[:P_PID]
  json.selected @user_facilities.include?(fac[:P_PID])
end
