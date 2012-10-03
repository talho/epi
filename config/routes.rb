Openphin::Application.routes.draw do
  namespace :epi do
    get "rods/options" => "rods#options"
    get "rods/search" => "rods#search"
  end
end
