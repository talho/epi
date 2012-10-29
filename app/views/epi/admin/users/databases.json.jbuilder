
json.rods @rods do |db|
  json.name db
  json.selected true if db == @detail.rods_database
end