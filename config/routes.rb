Openphin::Application.routes.draw do
  namespace :epi do
    get "rods/providers" => "rods#providers"
    get "rods/search" => "rods#search"
    
    namespace :admin do
      resources :users, :only => [:index, :update] do
        collection do
          get :databases
          get :facilities
        end
      end
    end
  end
end
