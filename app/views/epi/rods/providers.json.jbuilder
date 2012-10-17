json.array! @providers do |provider|
  json.(provider, :P_PID, :P_NAME)
end
