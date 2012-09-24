module Epi
  module Connection
    def self.included(base)
      base.establish_connection(
        adapter: 'sqlserver',
        host: '192.168.30.98',
        username: 'rollcall',
        password: 'Talh0Talh0',
        database: 'rods-midland'
      )
    end   
  end
end