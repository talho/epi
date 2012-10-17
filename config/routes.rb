Openphin::Application.routes.draw do
  namespace :epi do
    get "rods/providers" => "rods#providers"
    get "rods/search" => "rods#search"
  end
end
